import { CartItem } from "./cart-item";

export interface Cart {
  id?: string;      // Firestore document ID
  userId: string;
  items: CartItem[];
}