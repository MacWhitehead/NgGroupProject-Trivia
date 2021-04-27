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
      gamesWon: [],
      gamesLost: [],
      questionsAnswered: 0,
      questionsRight: 0,
      questionsWrong: 0,
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
