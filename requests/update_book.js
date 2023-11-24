import BookResponse from '../data/book_response.js';
import Book from '../data/book.js';
import consts from '../consts.js';

const {
  jsonContentType, successCode, notFoundCode, badRequestCode, successStatus, failStatus,
} = consts;

const updateBook = (request, handler, bookResults) => {
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
  const { bookId } = request.params;
  let bookResponse;
  let code;
  const book = bookResults.books.find((e) => e.id === bookId);
  if (name === undefined || name == null) {
    bookResponse = new BookResponse(
      failStatus,
      undefined,
      'Gagal memperbarui buku. Mohon isi nama buku',
    );
    code = badRequestCode;
  } else if (readPage > pageCount) {
    bookResponse = new BookResponse(
      failStatus,
      undefined,
      'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    );
    code = badRequestCode;
  } else if (book === undefined || book == null) {
    bookResponse = new BookResponse(
      failStatus,
      undefined,
      'Gagal memperbarui buku. Id tidak ditemukan',
    );
    code = notFoundCode;
  } else {
    bookResponse = new BookResponse(
      successStatus,
      undefined,
      'Buku berhasil diperbarui',
    );
    code = successCode;
    const finished = pageCount === readPage;
    const dateNow = new Date().toISOString();
    const newBook = new Book(
      bookId,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      book.insertedAt,
      dateNow,
    );
    bookResults.updateBook(newBook);
  }
  const response = handler.response(JSON.stringify(bookResponse));
  response.type(jsonContentType);
  response.code(code);
  return response;
};

export default updateBook;
