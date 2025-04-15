import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { enviroment } from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true
})
export class NavbarComponent implements OnInit {
  private firebaseConfig = enviroment.firebaseConfig;
  isLoggedIn:boolean=false;
  app:any;    
  auth:any;
  db:any;

  ngOnInit():void{
    this.app=initializeApp(this.firebaseConfig)
    this.auth=getAuth(this.app);
    this.db=getFirestore(this.app);
    
    onAuthStateChanged(this.auth ,(user) =>{
      if(user){
        this.isLoggedIn = !!user;
      } 
    })
  }

  logout(){
    signOut(this.auth).then(()=>{
      console.log('User logged out')
      this.isLoggedIn = false;
    }).catch(error=>{
      console.error('Logout error: ', error)
    })
  }

}
