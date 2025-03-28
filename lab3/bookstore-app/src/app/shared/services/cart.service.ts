import { Injectable } from '@angular/core';
import { Book } from '../models/book';

interface CartItem {
  book: Book;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];
  shippingCost = 5.99;

  get subtotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + (item.book.price * item.quantity), 0
    );
  }

  get total(): number {
    return this.subtotal + this.shippingCost;
  }

  addToCart(book: Book): void {
    const existingItem = this.cartItems.find(item => item.book.id === book.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ book, quantity: 1 });
    }
  }

  removeFromCart(book: Book): void {
    this.cartItems = this.cartItems.filter(item => item.book.id !== book.id);
  }

  updateQuantity(book: Book, quantity: number): void {
    const item = this.cartItems.find(i => i.book.id === book.id);
    if (item) {
      item.quantity = quantity;
    }
  }

  clearCart(): void {
    this.cartItems = [];
  }
}