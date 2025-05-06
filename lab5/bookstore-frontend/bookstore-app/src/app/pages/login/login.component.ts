import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private apiUrl = `${environment.apiBaseUrl}/auth`;
  isLoginMode: boolean = true;

  name: string = '';
  email: string = '';
  password: string = '';
  age: number = 18;

  auth = getAuth();

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  handleSubmit() {
    if (this.isLoginMode) {
      signInWithEmailAndPassword(this.auth, this.email, this.password)
        .then(async (userCredential) => {
          console.log('Logged in:', userCredential.user);
          // await this.dbService.readUserData(userCredential.user.uid);
          this.router.navigate(['/']);
        })
        .catch(error => {
          console.error('Login error:', error);
        });
    } else {
      createUserWithEmailAndPassword(this.auth, this.email, this.password)
        .then(async (userCredential) => {
          console.log('Registered:', userCredential.user);
          // await this.dbService.saveUserData(userCredential.user.uid, {
          //   name: this.name,
          //   email: this.email,
          //   age: this.age
          // });
          const token = await userCredential.user.getIdToken();
          await firstValueFrom(this.http.post(`${this.apiUrl}/register`, {
            name: this.name,
            email: this.email,
            age: this.age
          },
          {
            headers:{
              Autorization: `Bearer ${token}`
            }
          }));
          this.router.navigate(['/']);
        })
        .catch(error => {
          console.error('Registration error:', error.message);
        });
    }
  }
}
