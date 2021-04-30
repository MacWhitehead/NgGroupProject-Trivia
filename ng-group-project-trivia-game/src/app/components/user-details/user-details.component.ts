import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/interfaces/player';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})

export class UserDetailsComponent {
  winLossPercent: number = 0;
  correctIncorrectPercent: number = 0;
  exampleUser: Player[] = [
    {
    displayName: 'user1',
    email: 'example@example.com',
    photoURL: "https://images.pexels.com/photos/2295744/pexels-photo-2295744.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    stats: {
      gamesPlayed: 4,
      gamesWon: 3,
      gamesLost: 1,
      questionsAnswered: 40,
      questionsRight: [20],
      questionsWrong: [10],
      bestCategory: 'Mythology',
      worstCategory: 'Politics',
    },
    }
  ]

  constructor() {}

  ngOnInit(): void {
    this.getPercentages();
  }

  getPercentages() {
    let wins = this.exampleUser[0].stats.gamesWon;
    let totalGames = this.exampleUser[0].stats.gamesPlayed;
    let questionTotal = this.exampleUser[0].stats.questionsAnswered;
    let correctAnswers = this.exampleUser[0].stats.questionsRight[0];
    this.winLossPercent = (wins[0]/totalGames) * 100;
    this.correctIncorrectPercent = (correctAnswers/questionTotal) * 100;
    console.log(this.winLossPercent, this.correctIncorrectPercent)
  }

}