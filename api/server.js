"use strict";

const express = require("express");
const app = express();
const { MongoClient, ObjectID } = require("mongodb");
const cors = require("cors");
const axios = require("axios");
const connectionURL = "mongodb://127.0.0.1:27017";
const id = new ObjectID(); // this is used to grab the timestamp for database insertion
const { cleanedBookResults } = require("./utilities");

require("dotenv").config();

const API_KEY = process.env.key;
const DATABASE_NAME = "books-search";
const PORT = process.env.PORT || 8000;

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const cache = {
  results: [],
};

// Routes
app.post("/books/clear", (req, res) => {
  cache.results = [];
  res.send(cache.results).status(200);
});

app.get("/books", async (req, res) => {
  try {
    // input from front-end as an object
    const searchObject = req.query;

    // get the actual input off the object
    const searchString = searchObject[Object.keys(searchObject)[0]];

    // clean the input string
    const searchInput = searchString.replace(/\W/g, "").toLowerCase();

    // connect to MongoDB
    const client = await MongoClient.connect(connectionURL, {
      useNewUrlParser: true,
    });
    const db = client.db(DATABASE_NAME);

    // check if query exist in database
    let find = await db
      .collection("book-data")
      .countDocuments({ query: searchInput }, { limit: 1 });

    // if query exist in database, send data from database to front-end
    if (find > 0) {
      // grab data from database
      const bookResults = await db
        .collection("book-data")
        .find({ query: searchInput })
        .toArray();

      // send bookResults to front-end
      console.log("data retrieved from database");
      cache.results = bookResults.concat(cache.results);
      const ids = cache.results.map((b) => b.id);
      const uniqueIds = [...new Set(ids)];
      const uniqueResults = uniqueIds.map((id) =>
        cache.results.find((book) => book.id === id)
      );

      return res.json(uniqueResults);

      // if query does not exist in database, ping API, store results in database, send to front-end
    } else {
      const searchUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&key=${API_KEY}`;
      const { data } = await axios({
        method: "get",
        url: searchUrl,
      });

      // grab just the book data we want, stored as an array of objects
      const books = data[Object.keys(data)[2]];
      const timestamp = id.getTimestamp();
      const preparedBookResults = cleanedBookResults(
        books,
        searchInput,
        timestamp
      );

      // insert book data into database
      db.collection("book-data").insertMany(preparedBookResults, (error) => {
        if (error) {
          return console.log("Unable to insert query");
        }

        console.log("Data inserted into database");
      });

      cache.results = preparedBookResults.concat(cache.results);
      const ids = cache.results.map((b) => b.id);
      const uniqueIds = [...new Set(ids)];
      const uniqueResults = uniqueIds.map((id) =>
        cache.results.find((book) => book.id === id)
      );
      console.log("data retrieved from API");
      return res.json(uniqueResults);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
});

app.listen(PORT);

console.log("Listening on port: ", PORT);
