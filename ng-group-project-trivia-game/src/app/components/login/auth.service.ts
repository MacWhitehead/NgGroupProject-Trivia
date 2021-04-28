import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { User } from '../../interfaces/user';
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
    stats: {
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
      questionsAnswered: 0,
      questionsRight: [],
      questionsWrong: [],
      bestCategory: '',
      worstCategory: ''
    }
  };

  // Get ids for each user, for login assign authService host to
  // hostService hostPlayer from database

  constructor(public afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.users = this.afs.collection('users').valueChanges();
    this.usersCollection = this.afs.collection('users')
  }

  getUsers() {
    return this.users;
  }

  clearHost() {
    this.host.displayName = ''
    this.host.email = ''
    this.host.photoURL = ''
  }

  addUser() {
    this.usersCollection.add(this.host)
    console.log(`New user added to database :) ${this.host.displayName}`)
    this.getUsers().subscribe((data) => {
      console.log(data)
    })
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
        this.host.displayName = result.user.displayName;
        this.host.email = result.user.email;
        this.host.photoURL = result.user.photoURL;
        // console.log(`You have been successfully signed up!`);
        // console.log(this.host)
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
