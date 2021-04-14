const books = require('../books');
const {
  getFailedResponseWithMessage,
  getSuccessResponseWithData,
} = require('../handler-utils/response-creator');

const getBookByIdHandler = (request, h) => {
  const {bookId} = request.params;
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex === -1) {
    return getFailedResponseWithMessage(h, 'Buku tidak ditemukan', 404);
  }

  return getSuccessResponseWithData(h, {book: books[bookIndex]});
};

module.exports = getBookByIdHandler;
