const {nanoid} = require('nanoid');
const books = require('../books');

const addNewBookHandler = (request, h) => {
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

  if (!name || readPage > pageCount) {
    const message = !name ?
    'Gagal menambahkan buku. Mohon isi nama buku' :
    'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount';

    const response = h.response({
      status: 'fail',
      message,
    });
    response.code(400);
    return response;
  }

  const id = nanoid();
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt,
    updatedAt,
  };

  const newLength = books.push(newBook);

  if (books.length === newLength) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

module.exports = addNewBookHandler;
