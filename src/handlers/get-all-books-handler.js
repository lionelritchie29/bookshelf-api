const books = require('../books');
const {
  getSuccessResponseWithData,
} = require('../handler-utils/response-creator');

const getAllBooksHandler = (request, h) => {
  const {name, reading, finished} = request.query;
  let filteredBooks = null;

  if (name) {
    const booksByName = books.filter((book) => {
      return book.name.toUpperCase().includes(name.toUpperCase());
    });
    filteredBooks = getFilteredBooks(booksByName);
  } else if (reading) {
    const readBool = reading === '1' ? true : false;
    const booksByReading = books.filter((book) => book.reading === readBool);
    filteredBooks = getFilteredBooks(booksByReading);
  } else if (finished) {
    const finishBool = finished === '1' ? true : false;
    const booksByFinished =
      books.filter((book) => book.finished === finishBool);
    filteredBooks = getFilteredBooks(booksByFinished);
  } else {
    filteredBooks = getFilteredBooks(books);
  }
  return getSuccessResponseWithData(h, {books: filteredBooks});
};

const getFilteredBooks = (unfilteredBooks) => {
  const filteredBooks = [];
  unfilteredBooks.forEach((book) => {
    const {id, name, publisher} = book;
    filteredBooks.push({id, name, publisher});
  });
  return filteredBooks;
};

module.exports = getAllBooksHandler;
