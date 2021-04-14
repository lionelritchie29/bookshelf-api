const books = require('../books');
const {
  getSuccessResponseWithData,
} = require('../handler-utils/response-creator');

const getAllBooksHandler = (request, h) => {
  const filteredBooks = getFilteredBooks();
  return getSuccessResponseWithData(h, {books: filteredBooks});
};

const getFilteredBooks = () => {
  const filteredBooks = [];
  books.forEach((book) => {
    const {id, name, publisher} = book;
    filteredBooks.push({id, name, publisher});
  });
  return filteredBooks;
};

module.exports = getAllBooksHandler;
