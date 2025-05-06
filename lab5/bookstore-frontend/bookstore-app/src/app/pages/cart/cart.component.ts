import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../shared/services/cart.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { catchError, firstValueFrom, of } from 'rxjs';
import { CartItem } from '../../shared/models/cart-item';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  public cartService = inject(CartService);
  private orderService = inject(OrderService)
  
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  isLoading = true;
  error: string | null = null;

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().pipe(
      catchError(err => {
        this.error = 'Failed to load cart';
        this.isLoading = false;
        return of(null);
      })
    ).subscribe(cart => {
      if (cart) {
        this.cartItems = cart.items || [];
        this.calculateTotal();
      }
      this.isLoading = false;
    });
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + (item.book.price * item.quantity), 
      0
    );
  }

  updateQuantity(item: CartItem, newQuantity: number) {
    if (newQuantity < 1) {
      this.error = 'Quantity must be at least 1';
      return;
    }
  
    this.isLoading = true;
    this.error = null;
  
    this.cartService.updateQuantity(item.book.id, newQuantity).subscribe({
      next: (updatedCart) => {
        // Update local state with the server response
        const updatedItem = updatedCart.items.find(i => i.book.id === item.book.id);
        if (updatedItem) {
          item.quantity = updatedItem.quantity;
        }
        this.calculateTotal();
      },
      error: (err) => {
        this.error = err.message || 'Failed to update quantity';
        console.error('Update error:', err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  removeItem(item: CartItem) {
    this.isLoading = true;
    this.error = null;
  
    this.cartService.removeFromCart(item.book.id).subscribe({
      next: (updatedCart) => {
        // Update local state by filtering out the removed item
        this.cartItems = updatedCart.items;
        this.calculateTotal();
      },
      error: (err) => {
        this.error = err.message || 'Failed to remove item';
        console.error('Remove error:', err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  checkout() {
    this.isLoading = true;
    this.error = null;
  
    this.orderService.createOrder(this.cartItems).subscribe({
      next: (response) => {
        console.log('Order response:', response);
        alert('Order placed successfully!');
        this.cartItems = [];
        this.calculateTotal();
      },
      error: (error) => {
        console.error('Order error:', error);
        alert('Failed to place order. Please try again.');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  clearCart() {
    this.isLoading = true;
    this.error = null;
  
    this.cartService.clearCart().subscribe({
      next: (response) => {
        this.cartItems = response.cart.items || [];
        this.calculateTotal();
      },
      error: (err) => {
        this.error = err;
        console.error('Clear cart failed:', err);
      },
      complete: () => this.isLoading = false
    });
  }
}