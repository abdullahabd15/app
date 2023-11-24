export default class BookResults {
  constructor(books = []) {
    this.books = books;
  }

  getBooks = (name, reading, finished) => {
    let results = this.books;
    if (name !== undefined) {
      results = results.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()));
    }
    const validateNumber = (num) => typeof num === 'number' && !Number.isNaN(num) && (num >= 0 && num <= 1);
    if (validateNumber(reading)) {
      results = results.filter((e) => e.reading === (reading === 1));
    }
    if (validateNumber(finished)) {
      results = results.filter((e) => e.finished === (finished === 1));
    }
    return results.map((e) => ({ id: e.id, name: e.name, publisher: e.publisher }));
  };

  addBook(book) {
    this.books.push(book);
  }

  updateBook(book) {
    const index = this.books.findIndex((e) => e.id === book.id);
    this.books[index] = book;
  }

  deleteBook(bookId) {
    const index = this.books.findIndex((e) => e.id === bookId);
    this.books.splice(index, 1);
  }
}
