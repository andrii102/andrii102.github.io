import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';

  @Injectable({
    providedIn: 'root'
  })
  export class BookService {
    private books: Book[] = [];

    private booksUrl = `${environment.apiBaseUrl}/books`;

    constructor(private http: HttpClient) {}

    async getAllBooks(): Promise<Book[]> {
      if (this.books.length === 0) {
        this.books = await firstValueFrom(this.http.get<Book[]>(this.booksUrl));
      }
      return this.books;
    }

    async refreshBooks(): Promise<void> {
      this.books = await firstValueFrom(this.http.get<Book[]>(this.booksUrl));
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
