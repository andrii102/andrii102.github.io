import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../shared/services/cart.service';
import { Book } from '../../shared/models/book';
import { FirebaseDbService } from '../../shared/services/firebase-db.service';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  isLoggedIn: boolean = false;
  userId: string | null = null;
  auth = getAuth();

  constructor(
    public cartService: CartService,
    private dbService: FirebaseDbService
  ) {}

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      this.isLoggedIn = !!user;
      this.userId = user?.uid ?? null;
    });
  }

  removeItem(book: Book) {
    if (!this.isLoggedIn || !this.userId) {
      console.error('Error removing from cart - not authorized');
      alert('Error removing from cart - not authorized')
      return;
    }

    this.cartService.removeFromCart(book);
    this.dbService.saveUserCart(this.userId, this.cartService.getCartItems());
  }

  updateQuantity(book: Book, quantity: number) {
    if (!this.isLoggedIn || !this.userId) {
      console.error('Error updating cart - not authorized');
      return;
    }

    if (quantity > 0) {
      this.cartService.updateQuantity(book, quantity);
      this.dbService.saveUserCart(this.userId, this.cartService.getCartItems());
    }
  }
}
