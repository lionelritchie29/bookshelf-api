const books = require('../books');
const {
  getSuccessResponseWithData,
} = require('../handler-utils/response-creator');

const getAllBooksHandler = (request, h) => {
  const {name, reading, finished} = request.query;
  let filteredBooks = null;

  if (name) {
    filteredBooks = getFilteredBooksByName(books, name);
  } else if (reading) {
    filteredBooks = getFilteredBooksByReading(books, reading);
  } else if (finished) {
    filteredBooks = getFilteredBooksByFinished(books, finished);
  } else {
    filteredBooks = getFilteredBooks(books);
  }
  return getSuccessResponseWithData(h, {books: filteredBooks});
};

const getFilteredBooksByName = (unfilteredBooks, name) => {
  const booksByName = unfilteredBooks.filter((book) => {
    return book.name.toUpperCase().includes(name.toUpperCase());
  });
  return getFilteredBooks(booksByName);
};

const getFilteredBooksByFinished = (unfilteredBooks, finished) => {
  const finishBool = finished === '1' ? true : false;
  const booksByFinished =
    unfilteredBooks.filter((book) => book.finished === finishBool);
  return getFilteredBooks(booksByFinished);
};

const getFilteredBooksByReading = (unfilteredBooks, reading) => {
  const readBool = reading === '1' ? true : false;
  const booksByReading = unfilteredBooks
      .filter((book) => book.reading === readBool);
  return getFilteredBooks(booksByReading);
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
