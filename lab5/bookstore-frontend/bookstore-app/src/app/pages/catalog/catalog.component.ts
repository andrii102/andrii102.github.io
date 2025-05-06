import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { Book } from '../../shared/models/book';
import { BookService } from '../../shared/services/book.service';

@Component({
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule, BookCardComponent],
  providers: [BookService],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  public books: Book[] = [];
  public loading = true;

  constructor(private bookService: BookService) {}

  async ngOnInit() {
    this.books = await this.bookService.getAllBooks();
    this.loading = false;
  }

  // Filter controls
  filters = {
    title: '',
    genre: '',
    minPrice: 0,
    maxPrice: 50
  };

  // Available genres
  get genres(): string[] {
    return [...new Set(this.books.map(book => book.genre))];
  }

  // Filtered books
  get filteredBooks(): Book[] {
    return this.books.filter(book => {
      const titleMatch = book.title.toLowerCase().includes(this.filters.title.toLowerCase());
      const genreMatch = !this.filters.genre || book.genre === this.filters.genre;
      const priceMatch = book.price >= this.filters.minPrice && book.price <= this.filters.maxPrice;
      return titleMatch && genreMatch && priceMatch;
    });
  }

  resetFilters() {
    this.filters = {
      title: '',
      genre: '',
      minPrice: 0,
      maxPrice: 50
    };
  }

  // uploadInitialBooks() {
  //   this.dbService.uploadAllBooks().then(() => {
  //     console.log('Initial books uploaded');
  //   });
  // }
  
}
