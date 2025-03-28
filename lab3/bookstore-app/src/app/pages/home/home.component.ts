import { Component, OnInit } from '@angular/core';
import { Book } from '../../shared/models/book';
import { BookService } from '../../shared/services/book.service';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CommonModule, BookCardComponent]
})
export class HomeComponent implements OnInit {
  bestsellers:Book[]=[];

  constructor(private bookService: BookService, private cartService: CartService) {}

  ngOnInit(){
    this.loadBestsellers();
  }

  loadBestsellers(){
    const bestsellers = this.bookService.getBestsellers();
    
    if (bestsellers.length >= 4) {
      this.bestsellers = bestsellers.slice(0, 4);
    } else {
      const randomBooks = this.bookService.getRandomBooks(4 - bestsellers.length);
      this.bestsellers = [...bestsellers, ...randomBooks];
    }
  }

  addToCart(book: Book){
    this.cartService.addToCart(book);
  }

}
