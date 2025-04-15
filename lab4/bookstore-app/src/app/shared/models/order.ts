export interface Order {
    id: string;
    date: Date;
    items: {
      book: {
        title: string;
        price: number;
      };
      quantity: number;
    }[];
    status: 'Processing' | 'Shipped' | 'Delivered';
  }