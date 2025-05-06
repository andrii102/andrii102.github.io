import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiBaseUrl}/order`;

  constructor(private http: HttpClient) {}

  createOrder(cartItems: any[]) {
    return this.http.post(this.apiUrl, { items: cartItems });
  }

  getOrders() {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
}