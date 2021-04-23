import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/questions.service';
import { Player } from '../../interfaces/player';
import { GameControllerService } from '../../services/game-controller.service';
@Component({
  selector: 'app-trivia-page',
  templateUrl: './trivia-page.component.html',
  styleUrls: ['./trivia-page.component.scss'],
})
export class TriviaPageComponent implements OnInit {
  
  canSubmit: boolean;
  selectedAnswer: any;
  activeQuestion: any;
  activePlayer: any;
  players: Player[] = [];
  questions: any[] = [];
  isGameStarted: any;

  constructor(public questionsService: QuestionsService, public gameService: GameControllerService) {}

  ngOnInit(): void {
    //getQuestions service logic currently depends on having each property defined in the parameter. "any" value is take as empty string
    this.getQuestions({ amount: 10, category: '', difficulty: '', type: '' });
    this.isGameStarted = false;
  }
  //Pushes a player object based on Player interface layout to players variable
  addPlayer(p: string): void {
    this.players = this.gameService.addPlayer(p);
    console.log(this.players)
  }
  //runs the getQuestions function from questionsService and saves the results to the questions variable array
  getQuestions(params: any): void {
    this.gameService.getQuestions(params);
  }
  
  //changes isGameStarted to true so long as there is a player for rendering questions, sets first questions and player
  startGame(): void {
    this.gameService.startGame();
    this.questions = this.gameService.questions
    this.activeQuestion = this.gameService.activeQuestion;
    this.activePlayer = this.gameService.activePlayer;
    this.isGameStarted = this.gameService.isGameStarted;
  }
  //runs nextQuestion from game-controller service and pulls the active player and active question values
  nextQuestion(): void {
    this.gameService.nextQuestion();
    this.activePlayer = this.gameService.activePlayer;
    this.activeQuestion = this.gameService.activeQuestion;
  }
  //runs setSelected from game-controller service and pulls the selectedAnswer and canSubmit values
  setSelected(a: any): void{
    this.gameService.setSelected(a);
    this.selectedAnswer = this.gameService.selectedAnswer;
    this.canSubmit = this.gameService.canSubmit;
  }
  //used to change color of answers based on if amISelected() returns true or false
  amISelected(a: any){
    return this.gameService.amISelected(a);
  }
  
  submitAnswer(a: any): void {
    this.gameService.submitAnswer(a);
  }

  isAnswerSubmitted(){
    console.log(this.gameService.isAnswerSubmitted())
    return this.gameService.isAnswerSubmitted();
  }
  
}
