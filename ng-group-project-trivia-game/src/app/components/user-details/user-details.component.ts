import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/interfaces/player';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  exampleUser: Player[] = [
    {
    username: 'user1',
    id: 'user1',
    stats: {
      gamesPlayed: 4,
      gamesWon: [3],
      gamesLost: [1],
      questionsAnswered: 40,
      questionsRight: 30,
      questionsWrong: 10,
      bestCategory: 'Mythology',
      worstCategory: 'Politics',
    },
    }
  ]

  constructor() {}

  ngOnInit(): void {}
}
