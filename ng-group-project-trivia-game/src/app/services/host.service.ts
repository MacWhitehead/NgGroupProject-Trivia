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
    totalGamesPlayed: 0,
    totalGamesWon: 0,
    totalGamesLost: 0,
    totalQuestionsAnswered: 0,
    totalRightAnswers: 0,
    totalWrongAnswers: 0,
    bestCategory: '',
    worstCategory: '',
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
