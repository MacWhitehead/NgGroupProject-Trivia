import { Injectable } from '@angular/core';
import { User } from '../interfaces/user'


@Injectable({
  providedIn: 'root'
})
export class HostService {

  constructor() { }

  hostPlayer: User
  
  nonHostPlayers = []

  allPlayers = []

  setHostPlayer(x: User) {
    this.hostPlayer = x

  }
}
