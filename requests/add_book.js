import { nanoid } from 'nanoid';
import BookResponse from '../data/book_response.js';
import Book from '../data/book.js';
import consts from '../consts.js';

const {
  jsonContentType, insertedCode, badRequestCode, successStatus, failStatus,
} = consts;

const addBook = (request, handler, bookResults) => {
  const id = nanoid();
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
  let bookResponse;
  let code;
  if (name == null || name === undefined) {
    bookResponse = new BookResponse(
      failStatus,
      undefined,
      'Gagal menambahkan buku. Mohon isi nama buku',
    );
    code = badRequestCode;
  } else if (readPage > pageCount) {
    bookResponse = new BookResponse(
      failStatus,
      undefined,
      'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    );
    code = badRequestCode;
  } else {
    bookResponse = new BookResponse(
      successStatus,
      { bookId: id },
      'Buku berhasil ditambahkan',
    );
    code = insertedCode;
    const finished = pageCount === readPage;
    const dateNow = new Date().toISOString();
    const book = new Book(
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      dateNow,
      dateNow,
    );
    bookResults.addBook(book);
  }
  const response = handler.response(JSON.stringify(bookResponse));
  response.type(jsonContentType);
  response.code(code);
  return response;
};

export default addBook;
