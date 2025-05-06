import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'bookstore-app';
  showLayout: boolean = true;

  constructor(private router:Router){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        const url =event.urlAfterRedirects;
        this.showLayout != (url ==='/login' || '/register');
      }
    });
  }
}
