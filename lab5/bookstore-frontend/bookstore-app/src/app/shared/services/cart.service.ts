import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Book } from '../models/book';
import { Cart } from '../models/cart';
import { catchError, Observable, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/cart`;

  getCart() {
    return this.http.get<any>(this.apiUrl);
  }

  addToCart(book: Book, quantity: number = 1): Observable<Cart> {
    const payload = {
      book: {
        id: book.id,
        title: book.title,
        author: book.author,
        imageUrl: book.imageUrl,
        description: book.description,
        genre: book.genre,
        price: book.price,
        isBestseller: book.isBestseller,
        publishedYear: book.publishedYear
      },
      quantity: quantity
    };
  
    return this.http.post<Cart>(`${this.apiUrl}/add`, payload).pipe(
      catchError(error => {
        console.error('Add to cart error:', error);
        throw 'Failed to add to cart. Please try again.';
      })
    );
  }

  updateQuantity(bookId: number, newQuantity: number): Observable<Cart> {
    if (newQuantity < 1) {
      return throwError(() => new Error('Quantity must be at least 1'));
    }
  
    return this.http.put<Cart>(`${this.apiUrl}/update-quantity`, {
      bookId,
      newQuantity
    }).pipe(
      catchError(error => {
        console.error('Update quantity error:', error);
        throw error;
      })
    );
  }

  removeFromCart(bookId: number): Observable<Cart> {
    if (!bookId) {
      return throwError(() => new Error('Book ID is required'));
    }
  
    return this.http.delete<Cart>(`${this.apiUrl}/remove/${bookId}`).pipe(
      catchError(error => {
        console.error('Remove from cart error:', error);
        throw error;
      })
    );
  }

  clearCart(): Observable<{ success: boolean, cart: Cart }> {
    return this.http.delete<{ success: boolean, cart: Cart }>(
      `${this.apiUrl}/clear`
    ).pipe(
      catchError(error => {
        console.error('Clear cart error:', error);
        throw 'Failed to clear cart. Please try again.';
      })
    );
  }
}