// Задача. Створіть “Менеджер книг” (books_manager): CRUD-додаток для роботи з бібліотекою книг.
//  Кожна книга має назву, автора, рік видання. Дані зберігайте у файлі books.json.
//  Додайте пошук за автором та фільтрацію за роком. Використовуйте шаблонізатор EJS.

// !!! Єдине що, delete не працює, бо в формі не підтримується метод delete, далі розібратися не зміг ...

import Book from "../models/Book.mjs";

class BookController {
  static getAllBook(req, res) {
    try {
      let books = Book.loadList();

      const { year, author } = req.query;

      if (year) {
        books = books.filter((book) => String(book.year).startsWith(year));
      }
      if (author) {
        books = books.filter((book) =>
          book.author.toLowerCase().includes(author.toLowerCase())
        );
      }

      res.render("books/bookList", {
        title: "Book List",
        books,
        activePage: "books",
        author: author || "",
        year: year || "",
      });
    } catch (error) {
      res.status(500).render("error", {
        message: "Error fetch book list",
        error,
      });
    }
  }

  static getById(req, res) {
    try {
      const book = Book.loadById(req.params.id);
      res.render("books/info", {
        title: "Book info",
        book,
        activePage: "books",
      });
    } catch (error) {
      res.status(500).render("error", {
        message: "Error fetch book by id",
        error,
      });
    }
  }

  static getForm(req, res) {
    try {
      const book = req.params.id ? Book.loadById(req.params.id) : {};
      res.render("books/form", {
        title: "Book form",
        book,
        activePage: "books",
      });
    } catch (error) {
      res.status(500).render("error", {
        message: "Error fetch form",
        error,
      });
    }
  }

  static create(req, res) {
    try {
      const { _method, ...data } = req.body;
      data.year = Number(data.year);
      Book.createBook(data);
      res.redirect("/books");
    } catch (error) {
      res.status(500).render("error", {
        message: "Error saving book",
        error,
      });
    }
  }

  static update(req, res) {
    try {
      const { _method, ...data } = req.body;
      if (data.year) data.year = Number(data.year);
      Book.update(req.params.id, data);
      res.redirect("/books");
    } catch (error) {
      res.status(500).render("error", {
        message: "Error saving book",
        error,
      });
    }
  }

  static deleteById(req, res) {
    try {
      Book.deleteById(req.body.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).render("error", {
        message: "Error deleting book ",
        error,
      });
    }
  }
}

export default BookController;
