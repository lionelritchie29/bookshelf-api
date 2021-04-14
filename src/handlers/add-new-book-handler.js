const {nanoid} = require('nanoid');
const books = require('../books');
const {
  getFailedResponseWithMessage,
  getSuccessResponseWithMsgAndData,
} = require('../handler-utils/response-creator');

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

    return getFailedResponseWithMessage(h, message, 400);
  }

  const id = nanoid();
  const currentISODate = new Date().toISOString();
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
    finished: pageCount === readPage,
    insertedAt: currentISODate,
    updatedAt: currentISODate,
  };

  const newLength = books.push(newBook);
  if (books.length === newLength) {
    return getSuccessResponseWithMsgAndData(
        h, 'Buku berhasil ditambahkan', {bookId: id}, 201);
  }

  const response = h.response({
    status: 'error',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

module.exports = addNewBookHandler;
