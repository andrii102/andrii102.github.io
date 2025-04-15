import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../shared/models/book';
import { CartService } from '../../shared/services/cart.service';
import { FirebaseDbService } from '../../shared/services/firebase-db.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {
  @Input() book!: Book;

  isLoggedIn: boolean = false;
  userId: string | null = null;
  auth = getAuth();

  constructor(
    private cartService: CartService,
    private dbService: FirebaseDbService
  ) {}

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
        this.userId = user.uid;
      } else {
        this.isLoggedIn = false;
        this.userId = null;
      }
    });
  }

  async addToCart() {
    if (!this.isLoggedIn || !this.userId) {
      console.error('Error adding to cart - not authorized');
      alert('Error adding to cart - not authorized')
      return;
    }

    this.cartService.addToCart(this.book);
    console.log(`${this.book.title} added to cart!`);

    try {
      const cartItems = this.cartService.getCartItems();
      await this.dbService.saveUserCart(this.userId, cartItems);
      console.log('Cart saved to Firestore');
    } catch (error) {
      console.error('Error saving cart to Firestore:', error);
    }
  }
}
 