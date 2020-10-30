function cleanedBookResults(books, query, timestamp) {
  return books.map((book) => {
    return {
      query,
      timestamp,
      id: book.id,
      title:
        book.volumeInfo.title === null || book.volumeInfo.title === undefined
          ? "null"
          : book.volumeInfo.title,
      thumbnail:
        book.volumeInfo.imageLinks === undefined
          ? "undefined"
          : book.volumeInfo.imageLinks.thumbnail,
      publishedDate:
        book.volumeInfo.publishedDate === undefined
          ? "N/A"
          : book.volumeInfo.publishedDate,
      pageCount:
        book.volumeInfo.pageCount === undefined
          ? "N/A"
          : book.volumeInfo.pageCount,
      link: book.volumeInfo.previewLink,
      author:
        book.volumeInfo.authors === undefined
          ? "no author"
          : book.volumeInfo.authors.join(", "),
      subtitle: book.volumeInfo.subtitle,
      categories:
        book.volumeInfo.categories === undefined
          ? "N/A"
          : book.volumeInfo.categories,
      publisher:
        book.volumeInfo.publisher === undefined
          ? "N/A"
          : book.volumeInfo.publisher,
      description:
        book.volumeInfo.description === undefined
          ? "undefined"
          : book.volumeInfo.description.length < 140
          ? book.volumeInfo.description
          : book.volumeInfo.description.charAt(140) === " " ||
            book.volumeInfo.description.charAt(140) === "." ||
            book.volumeInfo.description.charAt(140) === "?" ||
            book.volumeInfo.description.charAt(140) === ";" ||
            book.volumeInfo.description.charAt(140) === "!"
          ? book.volumeInfo.description.substring(0, 139).concat("...")
          : book.volumeInfo.description.substring(0, 140).concat("..."),
    };
  });
}

module.exports = {
  cleanedBookResults,
};
