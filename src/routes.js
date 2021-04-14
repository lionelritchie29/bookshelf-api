const addNewBookHandler = require('./handlers/add-new-book-handler');
const getAllBooksHandler = require('./handlers/get-all-books-handler');
const getBookByIdHandler = require('./handlers/get-book-by-idhandler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addNewBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookByIdHandler,
  },
];

module.exports = routes;
