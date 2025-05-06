import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../shared/services/order.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    address: '123 Main St, Anytown, USA',
    phone: '+1 555-1234',
    avatar: 'assets/default-avatar.jpg'
  
  };

  // Order history
  orders: any[] = [];
  isLoadingOrders = true;

  // Edit mode
  isEditing = false;
  editUser = { ...this.user };

  constructor(private orderService: OrderService) {}

  async ngOnInit() {
    try {
      this.loadOrders()
    } catch (err) {
      console.error('Error loading orders:', err);
    } finally {
      this.isLoadingOrders = false;
    }
  }

  loadOrders() {
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.isLoadingOrders = false;
      },
      error: (err) => {
        console.error('Failed to load orders:', err);
        this.isLoadingOrders = false;
      }
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.editUser = { ...this.user };
    }
  }

  saveProfile() {
    this.user = { ...this.editUser };
    this.isEditing = false;
  }

  getOrderTotal(order: any): number {
    return order.total || order.items.reduce(
      (total: number, item: any) => total + (item.book.price * item.quantity),
      0
    );
  }
}