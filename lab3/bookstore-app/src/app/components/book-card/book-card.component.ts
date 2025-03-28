import { Component, Input } from '@angular/core';
import { Book } from '../../shared/models/book';
import { CartService } from '../../shared/services/cart.service';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent {
  @Input() book!: Book;
  
  constructor(private cartService: CartService) {}

  addToCart() {
    this.cartService.addToCart(this.book);
    console.log(`${this.book.title} added to cart!`);
  }
}
