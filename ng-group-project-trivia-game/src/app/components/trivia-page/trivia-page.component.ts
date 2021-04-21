import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/questions.service';
import { Player } from '../../interfaces/player'
@Component({
  selector: 'app-trivia-page',
  templateUrl: './trivia-page.component.html',
  styleUrls: ['./trivia-page.component.scss']
})
export class TriviaPageComponent implements OnInit {
  activeQuestion: {};
  activePlayer: {}
  players: Player[] = [];
  questions: any[] = [];
  isGameStarted: boolean;
  
  constructor(public questionsService: QuestionsService) { }

  ngOnInit(): void {

    this.getQuestions({amount: 10, category: '', difficulty: '', type: ''})
  }

  addPlayer(p: string): void{
    this.players.push({
      username: p,
      id: `${this.players.length + 1}`,
      stats: {
          gamesPlayed: 0,
          gamesWon: [],
          gamesLost: [],
          questionsAnswered: 0,
          questionsRight: 0,
          questionsWrong: 0,
          bestCategory: '',
          worstCategory: '',
      }
    })
    console.log(this.players)
  }

  getQuestions(params: any): void{
    this.questionsService.getQuestions(params)
    .subscribe((response: any) => {
      this.questions = response.results;
    })
  }

}
