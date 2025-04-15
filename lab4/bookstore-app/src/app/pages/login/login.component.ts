import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirebaseDbService } from '../../shared/services/firebase-db.service';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  isLoginMode: boolean = true;

  name: string = '';
  email: string = '';
  password: string = '';
  age: number = 18;

  auth = getAuth();

  constructor(
    private router: Router,
    private dbService: FirebaseDbService
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
          await this.dbService.readUserData(userCredential.user.uid);
          this.router.navigate(['/']);
        })
        .catch(error => {
          console.error('Login error:', error);
        });
    } else {
      createUserWithEmailAndPassword(this.auth, this.email, this.password)
        .then(async (userCredential) => {
          console.log('Registered:', userCredential.user);
          await this.dbService.saveUserData(userCredential.user.uid, {
            name: this.name,
            email: this.email,
            age: this.age
          });
          this.router.navigate(['/']);
        })
        .catch(error => {
          console.error('Registration error:', error.message);
        });
    }
  }
}
