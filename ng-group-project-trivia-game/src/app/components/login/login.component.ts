import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from './auth.service';
import { HostService } from '../../services/host.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  users: User[];
  emails: String[];

  loggingIn() {
    this.authService.GoogleAuthLogin().then(() => {
      if (this.emails.includes(this.authService.host.email)) {
        console.log(`There you are :) ${this.authService.host.displayName}`);
        this.hostService.setHostPlayer({
          displayName: this.authService.host.displayName,
          email: this.authService.host.email,
          photoURL: this.authService.host.photoURL,
          stats: {
            gamesPlayed: 0,
            gamesWon: 0,
            gamesLost: 0,
            questionsAnswered: 0,
            questionsRight: [],
            questionsWrong: [],
            bestCategory: '',
            worstCategory: '',
          },
        });
        // this.hostService.setHostPlayer(this.authService.host)
        console.log('HOST USER DATA:');
        console.log(this.hostService.hostPlayer);
      } else {
        console.log('Create an account homie');
        this.authService.clearHost();
      }
    });
  }

  signingUp() {
    this.authService.GoogleAuthSignup().then(() => {
      if (this.emails.includes(this.authService.host.email)) {
        console.log('You already have an account bruh');
        this.authService.clearHost();
      } else {
        this.authService.addUser();
      }
    });
  }

  constructor(
    public authService: AuthService,
    public hostService: HostService
  ) {}

  ngOnInit() {
    this.authService.getUsers().subscribe((users: any) => {
      this.users = users;
      this.emails = this.users.map((user) => user.email);
      this.hostService.allPlayers = users;
      // console.log(this.hostService.allPlayers)
    });
  }
}
