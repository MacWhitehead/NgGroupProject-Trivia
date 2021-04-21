import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usersRef: AngularFireList<any>;      // Reference to users list, Its an Observable
  userRef: AngularFireObject<any>;     // Reference to user object, Its an Observable too

  constructor(
    private afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
  ) {}
  
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
