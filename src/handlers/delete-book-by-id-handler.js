const books = require('../books');
const {
  getFailedResponseWithMessage,
  getSuccessResponseWithMessage,
} = require('../handler-utils/response-creator');

const deleteBookByIdHandler = (request, h) => {
  const {bookId} = request.params;
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex === -1) {
    return getFailedResponseWithMessage(
        h, 'Buku gagal dihapus. Id tidak ditemukan', 404);
  };

  books.splice(bookIndex, 1);
  return getSuccessResponseWithMessage(h, 'Buku berhasil dihapus');
};

module.exports = deleteBookByIdHandler;
