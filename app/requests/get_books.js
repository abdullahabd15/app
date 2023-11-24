import BookResponse from '../data/book_response.js';
import consts from '../consts.js';

const { jsonContentType, successCode, successStatus } = consts;

const getBooks = (request, handler, bookResults) => {
  const { name, reading, finished } = request.query;
  const results = bookResults.getBooks(name, parseInt(reading, 10), parseInt(finished, 10));
  const bookResponse = new BookResponse(
    successStatus,
    { books: results },
  );
  const response = handler.response(JSON.stringify(bookResponse));
  response.type(jsonContentType);
  response.code(successCode);
  return response;
};

export default getBooks;
