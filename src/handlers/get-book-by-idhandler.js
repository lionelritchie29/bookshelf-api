const books = require('../books');

const getBookByIdHandler = (request, h) => {
  const {bookId} = request.params;

  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      book: books[bookIndex],
    },
  });
  response.code(200);
  return response;
};

module.exports = getBookByIdHandler;
