  import { Injectable } from '@angular/core';
  import { Book } from '../models/book';
  import { FirebaseDbService } from './firebase-db.service';

  @Injectable({
    providedIn: 'root'
  })
  export class BookService {
    private books: Book[] = [];

    constructor(private dbService: FirebaseDbService) {}

    async getAllBooks(): Promise<Book[]> {
      if (this.books.length === 0) {
        this.books = await this.dbService.getAllBooks();
      }
      return this.books;
    }

    async refreshBooks(): Promise<void> {
      this.books = await this.dbService.getAllBooks();
    }

    getBookById(id: number): Book | undefined {
      return this.books.find(book => book.id === id);
    }

    getBestsellers(): Book[] {
      return this.books.filter(book => book.isBestseller);
    }

    getRandomBooks(count: number): Book[] {
      return [...this.books]
        .sort(() => 0.5 - Math.random())
        .slice(0, count);
    }
  }
