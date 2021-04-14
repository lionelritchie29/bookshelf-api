const books = require('../books');

const getAllBooksHandler = (request, h) => {
  const filteredBooks = getFilteredBooks();
  const response = h.response({
    status: 'success',
    data: {
      books: filteredBooks,
    },
  });
  response.code(200);
  return response;
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
