import { Injectable } from '@angular/core';
import { User } from '../interfaces/user'


@Injectable({
  providedIn: 'root'
})
export class HostService {

  constructor() { }

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
      worstCategory: ''
  }
  }
  
  nonHostPlayers = []

  allPlayers = []

  setHostPlayer(x: User) {
    this.hostPlayer = x
    this.nonHostPlayers = this.allPlayers.filter(x => {
      return x.email != this.hostPlayer.email
    })

  }

}
