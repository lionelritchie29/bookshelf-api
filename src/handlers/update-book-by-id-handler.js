const books = require('../books');

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

    const response = h.response({
      status: 'fail',
      message,
    });
    response.code(400);
    return response;
  };

  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
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

    console.log(books[bookIndex]);

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  };
};

module.exports = updateBookByIdHandler;
