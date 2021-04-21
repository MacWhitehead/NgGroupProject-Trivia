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
  activePlayer: {};
  players: Player[] = [];
  questions: any[] = [];
  isGameStarted: boolean;
  
  constructor(public questionsService: QuestionsService) { }

  ngOnInit(): void {
    //getQuestions service logic currently depends on having each property defined in the parameter. "any" value is take as empty string
    this.getQuestions({amount: 10, category: '', difficulty: '', type: ''})
    this.isGameStarted = false;
  }
  //Pushes a player object based on Player interface layout to players variable
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
  }
  //runs the getQuestions function from questionsService and saves the results to the questions variable array
  getQuestions(params: any): void{
    this.questionsService.getQuestions(params)
    .subscribe((response: any) => {
      console.log(response.results)
      this.questions = response.results
    })
  }
  //changes isGameStarted to true so long as there is a player for rendering questions, sets first questions and player
  startGame(): void{
    if (this.players.length > 0){
      this.isGameStarted = true;
    }
    this.activeQuestion = this.questions[0]
    this.activePlayer = this.players[0]
  }

  nextQuestion(): void{
    this.activeQuestion = this.questions[this.questions.indexOf(this.activeQuestion) + 1]
  }
}
