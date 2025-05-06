import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../shared/models/book';
import { CartService } from '../../shared/services/cart.service';
// import { FirebaseDbService } from '../../shared/services/firebase-db.service';
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
    private cartService: CartService
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

  addToCart() {
    if (!this.isLoggedIn || !this.userId) {
      console.error('Error adding to cart - not authorized');
      alert('Please log in to add items to cart');
      return;
    }
  
    console.log('Attempting to add to cart:', this.book.title);
    
    this.cartService.addToCart(this.book).subscribe({
      next: () => {
        console.log(`${this.book.title} successfully added to cart!`);
        alert(`${this.book.title} added to cart!`);
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
        alert('Failed to add to cart. Please try again.');
      }
    });
  }
}
 