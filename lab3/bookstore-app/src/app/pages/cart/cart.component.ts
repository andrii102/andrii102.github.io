import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../shared/services/cart.service';
import { Book } from '../../shared/models/book';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(public cartService: CartService) {}

  removeItem(book: Book) {
    this.cartService.removeFromCart(book);
  }

  updateQuantity(book: Book, quantity: number) {
    if (quantity > 0) {
      this.cartService.updateQuantity(book, quantity);
    }
  }
}