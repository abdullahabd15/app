import consts from './consts.js';
import BookResults from './book_results.js';
import addBook from './requests/add_book.js';
import getBooks from './requests/get_books.js';
import getBookById from './requests/get_book_by_id.js';
import updateBook from './requests/update_book.js';
import deleteBook from './requests/delete_book.js';

const {
  getMethod, postMethod, putMethod, deleteMethod, urlBooks,
} = consts;

const bookResults = new BookResults();

const routes = [
  {
    method: postMethod,
    path: urlBooks,
    handler: (request, h) => addBook(request, h, bookResults),
  },
  {
    method: getMethod,
    path: urlBooks,
    handler: (request, h) => getBooks(request, h, bookResults),
  },
  {
    method: getMethod,
    path: `${urlBooks}/{bookId}`,
    handler: (request, h) => getBookById(request, h, bookResults),
  },
  {
    method: putMethod,
    path: `${urlBooks}/{bookId}`,
    handler: (request, h) => updateBook(request, h, bookResults),
  },
  {
    method: deleteMethod,
    path: `${urlBooks}/{bookId}`,
    handler: (request, h) => deleteBook(request, h, bookResults),
  },
];

export default routes;
