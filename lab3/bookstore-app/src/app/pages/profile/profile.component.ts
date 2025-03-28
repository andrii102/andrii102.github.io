import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order } from '../../shared/models/order';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  // User data
  user = {
    name: 'John Doe',
    email: 'john@example.com',
    address: '123 Book St, Library City',
    phone: '+1 (555) 123-4567',
    avatar: 'assets/default-avatar.jpg'
  };

  // Order history
  orders: Order[] = [
    {
      id: '#1001',
      date: new Date('2023-05-15'),
      items: [
        { book: { title: 'The Great Gatsby', price: 12.99 }, quantity: 1 },
        { book: { title: 'Dune', price: 15.99 }, quantity: 2 }
      ],
      status: 'Delivered'
    },
    {
      id: '#1002',
      date: new Date('2023-06-20'),
      items: [
        { book: { title: 'Atomic Habits', price: 10.50 }, quantity: 1 }
      ],
      status: 'Shipped'
    }
  ];

  // Edit mode
  isEditing = false;
  editUser = { ...this.user };

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

  getOrderTotal(order: Order): number {
    return order.items.reduce(
      (total, item) => total + (item.book.price * item.quantity),
      0
    );
  }
}