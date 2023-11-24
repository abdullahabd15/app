import BookResponse from '../data/book_response.js';
import consts from '../consts.js';

const {
  jsonContentType, successCode, notFoundCode, successStatus, failStatus,
} = consts;

const deleteBook = (request, handler, bookResults) => {
  const { bookId } = request.params;
  const book = bookResults.books.find((e) => e.id === bookId);
  let bookResponse;
  let code;
  if (book == null || book === undefined) {
    bookResponse = new BookResponse(failStatus, undefined, 'Buku gagal dihapus. Id tidak ditemukan');
    code = notFoundCode;
  } else {
    bookResponse = new BookResponse(successStatus, undefined, 'Buku berhasil dihapus');
    code = successCode;
    bookResults.deleteBook(bookId);
  }
  const response = handler.response(JSON.stringify(bookResponse));
  response.type(jsonContentType);
  response.code(code);
  return response;
};

export default deleteBook;
