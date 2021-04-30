import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
@Injectable({
  providedIn: 'root',
})
export class HostService {
  constructor(
    public router: Router
  ) {}

  userLoggedIn = false;

  hostPlayer: User = {
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
      worstCategory: '',
    },
  };

  nonHostPlayers = [];

  allPlayers = [];
  setHostPlayer(x: User) {
    this.hostPlayer = x;
    this.userLoggedIn = true;
    this.nonHostPlayers = this.allPlayers.filter((x) => {
      return x.email != this.hostPlayer.email;
    });
  }

  logOut() {
    this.router.navigate(['login-page'])
    console.log(this.allPlayers)
  }
}
