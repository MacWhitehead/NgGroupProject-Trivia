import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { auth } from 'firebase/app'; THIS DOESN"T WORK ANYMORE
import firebase from 'firebase/app';
// then use the full path to get the auth service.
// firebase.auth.
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'; 
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({providedIn: 'root'})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
  }



}
