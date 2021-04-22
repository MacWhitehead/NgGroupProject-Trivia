import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  users: User[];
  emails: String[];
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

  loggingIn() {
    this.authService
      .GoogleAuthLogin()
      .then(() => {
        this.host = this.authService.host;
      })
      .then(() => {
        if (this.emails.includes(this.host.email)) {
          console.log("It's here!!!")
        } else console.log('Create an account homie')
      })
  }

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.getUsers().subscribe((users: any) => {
      this.users = users;
      this.emails = this.users.map(user => user.email);
    })
  }
}
