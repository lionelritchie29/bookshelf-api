const books = require('../books');
const {
  getFailedResponseWithMessage,
  getSuccessResponseWithMessage,
} = require('../handler-utils/response-creator');

const updateBookByIdHandler = (request, h) => {
  const {bookId} = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();

  if (!name || readPage > pageCount) {
    const message = !name ?
      'Gagal memperbarui buku. Mohon isi nama buku' :
      'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount';

    return getFailedResponseWithMessage(h, message, 400);
  };

  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex === -1) {
    return getFailedResponseWithMessage(
        h, 'Gagal memperbarui buku. Id tidak ditemukan', 404);
  } else {
    books[bookIndex] = {
      ...books[bookIndex],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    return getSuccessResponseWithMessage(h, 'Buku berhasil diperbarui');
  };
};

module.exports = updateBookByIdHandler;
