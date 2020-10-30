## Introduction

This is a search app to query the Google Books API. It captures your query input, gathers results from the API, stores them in a database (MongoDB), and renders the results in the browser. Repeated searches use the data stored in the database rather than calling the API.

_Currently setting up Heroku deployment. This text will be replaced with a link soon._

## Local Project Setup

1. Clone the project.
2. Install dependencies.
3. Create a `.env` file in the project root directory and write `key=`. You will need enter your own Google Books API key. Instructions [here](https://developers.google.com/books/docs/v1/using#APIKey).
4. Setup MongoDB. Installation instructions found [here](https://docs.mongodb.com/guides/server/install/).
   1. If you're on Linux, you can follow these instructions.
      1. Navigate to the Community Server [download page](https://www.mongodb.com/try/download/community).
      2. For the options, select the current version (`4.4.0` currently) under `Version`, your operating system under `Platform`, and `TGZ` under `Package`. Click `Download`.
      3. Navigate to your Downloads folder. Extract the contents of the file you just downloaded.
      4. Rename the extracted folder to `mongodb`.
      5. Move the renamed folder to a different location, e.g., `/home/<your name>/` (so that the file path would be `/home/<your name>/mongodb`).
      6. Create a folder to collect your database data, e.g., a folder called `mongodb-data-storage` with the file path `/home/<your name>/mongodb-data-storage`.
      7. Remember the path to both of these folders! They comprise the command to start your database connection.
5. Navigate to the root of the project and run `npm run start`. This will start your back-end server and front-end. A browser should load automatically with the app running.
6. In a separate terminal, start your database connection. The format of the command (on Linux) is like this: `/<your path>/mongodb/bin/mongod --dbpath=/<your path>/mongodb-data-storage`. In my case given where I moved the MongoDB installation files, my path is `/home/david/mongodb/bin/mongod --dbpath=/home/david/mongodb-data-storage`. The first part of the command runs the MongoDB .exe and the second part (`--dbpath` onwards) specifies where your data will be stored.

The app should now function correctly. Try searching for a book! If you'd like a GUI for your database, I recommend [Robo 3T](https://robomongo.org/).
