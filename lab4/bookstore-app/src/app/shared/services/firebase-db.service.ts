import { Injectable } from '@angular/core';
import { getFirestore, doc, getDoc, setDoc, updateDoc, addDoc, collection, Firestore, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { Book } from '../models/book';
import { enviroment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDbService {
  private firebaseConfig = enviroment.firebaseConfig;

  private db: Firestore;

  constructor() {
    const app = initializeApp(this.firebaseConfig);
    this.db = getFirestore(app);
  }

  getDb() {
    return this.db;
  }

  async saveUserData(userId: string, data: any) {
    try {
      await setDoc(doc(this.db, 'users', userId), data);
      console.log('User data saved successfully');
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  }

  async readUserData(userId: string) {
    try {
      const docSnap = await getDoc(doc(this.db, 'users', userId));
      if (docSnap.exists()) {
        console.log('User data:', docSnap.data());
        return docSnap.data();
      } else {
        console.log('No user data found');
        return null;
      }
    } catch (error) {
      console.error('Error reading user data:', error);
      return null;
    }
  }

  async saveUserCart(userId: string, items: any[]) {
    const cartRef = doc(this.db, 'cart', userId);
    await setDoc(cartRef, {
      userId,
      items,
    });
  }
  
  async getUserCart(userId: string) {
    const cartRef = doc(this.db, 'cart', userId);
    const snap = await getDoc(cartRef);
    return snap.exists() ? snap.data() : null;
  }

  async uploadAllBooks(){
     const books = [
          {
            "id": 1,
            "title": "Абрикоси Донбасу",
            "author": "Любов Якимчук",
            "imageUrl": "assets/book1.jpg",
            "description": "Поетична збірка про війну та рідний край.",
            "genre": "Поезія",
            "price": 22,
            "isBestseller": true,
            "publishedYear": 2022
          },
          {
            "id": 2,
            "title": "Оповідь",
            "author": "Роберт Маккі",
            "imageUrl": "assets/book2.jpg",
            "description": "Мистецтво написання сценаріїв.",
            "genre": "Навчання",
            "price": 25,
            "isBestseller": true,
            "publishedYear": 2020
          },
          {
            "id": 3,
            "title": "Я перетворююсь",
            "author": "Володимир Вакуленко-К",
            "imageUrl": "assets/book3.jpg",
            "description": "Вірші та роздуми про життя.",
            "genre": "Поезія",
            "price": 18,
            "isBestseller": false,
            "publishedYear": 2021
          },
          {
            "id": 4,
            "title": "Всі системи: Небезпека",
            "author": "Марта Веллс",
            "imageUrl": "assets/book4.jpg",
            "description": "Науково-фантастичний роман про андроїда.",
            "genre": "Фантастика",
            "price": 24,
            "isBestseller": true,
            "publishedYear": 2023
          },
          {
            "id": 5,
            "title": "Під скляним ковпаком",
            "author": "Сильвія Плат",
            "imageUrl": "assets/book5.jpg",
            "description": "Культовий роман про внутрішню боротьбу.",
            "genre": "Класика",
            "price": 19,
            "isBestseller": false,
            "publishedYear": 1963
          },
          {
            "id": 6,
            "title": "Далекі Близькі",
            "author": "Володимир Єрмоленко",
            "imageUrl": "assets/book6.jpg",
            "description": "Есе про мандри та самопізнання.",
            "genre": "Есеїстика",
            "price": 20,
            "isBestseller": true,
            "publishedYear": 2019
          },
          {
            "id": 7,
            "title": "Тіні Забутих Предків",
            "author": "Михайло Коцюбинський",
            "imageUrl": "assets/book7.jpg",
            "description": "Класичний твір про гуцульську культуру.",
            "genre": "Класика",
            "price": 15,
            "isBestseller": false,
            "publishedYear": 1911
          },
          {
            "id": 8,
            "title": "Вересова міль",
            "author": "Оксана Була",
            "imageUrl": "assets/book8.jpg",
            "description": "Дитяча казка з екологічним підтекстом.",
            "genre": "Дитяча",
            "price": 12,
            "isBestseller": false,
            "publishedYear": 2020
          },
          {
            "id": 9,
            "title": "Череп, що шепоче",
            "author": "Джонатан Страуд",
            "imageUrl": "assets/book9.jpg",
            "description": "Детективна історія у стилі фентезі.",
            "genre": "Фентезі",
            "price": 23,
            "isBestseller": true,
            "publishedYear": 2022
          }
    
      ];
    
    for(const book of books){
      addDoc(collection(this.db, 'books'), book)
      .then(()=>console.log(`Added ${book.title}`))
      .catch((error)=>console.error(error))
    } 
  }

    async getAllBooks():Promise<Book[]>{
      const querySnapshot = await getDocs(collection(this.db, 'books'));
      return querySnapshot.docs.map(doc => doc.data() as Book);
    }

}
