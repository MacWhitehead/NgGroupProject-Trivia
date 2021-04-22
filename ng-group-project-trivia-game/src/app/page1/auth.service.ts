import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { User } from '../interfaces/user';
import { Observable, pipe} from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<any>;
  host: User = {
    displayName: '',
    email: '',
    photoURL: '',
    totalGamesPlayed: 0,
    totalGamesWon: 0,
    totalGamesLost: 0,
    totalQuestionsAnswered: 0,
    totalRightAnswers: 0,
    totalWrongAnswers: 0,
    bestCategory: '',
    worstCategory: '',
  };

  constructor(public afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.users = this.afs.collection('users').valueChanges();
  }

  getUsers() {
    return this.users;
  }

  GoogleAuthLogin() {
    return this.afAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        this.host.displayName = result.user.displayName;
        this.host.email = result.user.email;
        this.host.photoURL = result.user.photoURL;
        // console.log(`${result.user.displayName} has successfully logged in!`);
        // console.log(result.user)
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
