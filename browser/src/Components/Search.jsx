import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  IconButton,
  Grid,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import BookCards from "./BookCards";
import axios from "axios";
import missingBookImage from "../book_image_not_available.jpg";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

const styles = {
  toolBar: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
  },
  clearButton: {
    justifyContent: "flex-end",
  },
  input: {
    color: "white",
    "& .MuiInputBase-root .MuiInput-underline": {
      borderColor: "green",
    },
    "&:hover .MuiInputBase-root .MuiInput-underline": {
      borderColor: "red",
    },
  },
  results: {
    textAlign: "-webkit-center",
    paddingTop: "30px",
  },
  text: {
    textAlign: "right",
  },
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  state = {
    searchValue: "",
    bookResults: [],
  };

  handleOnChange = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  handleSearch = () => {
    this.makeApiCall(this.state.searchValue);
  };

  handleKeyPress(e) {
    if (e.keyCode === 13) {
      this.makeApiCall(this.state.searchValue);
    }
  }

  handleClear = () => {
    axios({
      method: "post",
      url: `http://localhost:8000/books/clear`,
    })
      .then((response) => {
        const booksData = response.data;
        this.setState({
          searchValue: "",
          bookResults: booksData,
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong.");
      });
  };

  makeApiCall = (searchInput) => {
    axios({
      method: "get",
      url: `http://localhost:8000/books?q=${searchInput}`,
    })
      .then((response) => {
        const booksData = response.data;
        this.setState({
          bookResults: booksData,
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong.");
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar position="static">
          <Toolbar className={classes.toolBar}>
            <Typography>Google Books</Typography>
            <div>
              <TextField
                id="standard-basic"
                variant="standard"
                placeholder="Search for a book..."
                size="small"
                InputProps={{
                  className: classes.input,
                  startAdornment: (
                    <InputAdornment>
                      <IconButton
                        className={classes.input}
                        type="submit"
                        aria-label="search"
                        size="small"
                        onClick={this.handleSearch}
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => this.handleOnChange(e)}
                value={this.state.searchValue}
                onKeyDown={this.handleKeyPress}
              />
            </div>
            <Button
              className={classes.clearButton}
              variant="contained"
              onClick={this.handleClear}
            >
              Clear
            </Button>
          </Toolbar>
        </AppBar>

        <div>
          {this.state.bookResults ? (
            <Grid container spacing={1} className={classes.results}>
              {this.state.bookResults.map((book) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                  <BookCards
                    title={
                      book.title === "undefined" ? (
                        <Box fontStyle="italic">Title unavailable</Box>
                      ) : (
                        book.title
                      )
                    }
                    thumbnail={
                      book.thumbnail === "undefined"
                        ? missingBookImage
                        : book.thumbnail
                    }
                    publishedDate={
                      book.publishedDate === "undefined" ? (
                        <Box fontStyle="italic">N/A</Box>
                      ) : (
                        book.publishedDate
                      )
                    }
                    pageCount={
                      book.pageCount === "undefined" ? (
                        <Box fontStyle="italic">N/A</Box>
                      ) : (
                        book.pageCount
                      )
                    }
                    link={book.link}
                    author={
                      book.author === "undefined" ? (
                        <Box fontStyle="italic">No author listed</Box>
                      ) : (
                        book.author
                      )
                    }
                    subtitle={book.subtitle}
                    description={
                      book.description === "undefined" ? (
                        <Box fontStyle="italic">No description available.</Box>
                      ) : (
                        book.description
                      )
                    }
                    publisher={
                      book.publisher === "undefined" ? (
                        <Box fontStyle="italic">N/A</Box>
                      ) : (
                        book.publisher
                      )
                    }
                    categories={
                      book.categories === "undefined" ? (
                        <Box fontStyle="italic">N/A</Box>
                      ) : (
                        book.categories
                      )
                    }
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <div>
              <p>Try searching for a book</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Search);
