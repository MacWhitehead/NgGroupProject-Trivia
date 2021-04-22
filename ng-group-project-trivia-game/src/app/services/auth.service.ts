import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usersCollection: AngularFirestoreCollection<User>
  users: Observable<any[]>

  constructor(
    public afs: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) {
    this.users = this.afs.collection('users').valueChanges() 
  }

  getUsers() {
    return this.users
  }
  
  GoogleAuthLogin() {
    return this.afAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        console.log(`${result.user.displayName} has successfully logged in!`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  GoogleAuthSignup() {
    return this.afAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        console.log('You have been successfully signed up!');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
