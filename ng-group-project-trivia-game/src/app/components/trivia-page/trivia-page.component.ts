import { Component, OnInit } from '@angular/core';
import { HostService } from 'src/app/services/host.service';
import { Player } from '../../interfaces/player';
import { GameControllerService } from '../../services/game-controller.service';
import { PlayerService } from '../../services/players.service'
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
  isGameStarted: boolean;

  constructor(public gameService: GameControllerService, public playerService: PlayerService, hostService: HostService) {}

  ngOnInit(): void {
    //getQuestions service logic currently depends on having each property defined in the parameter. "any" value is take as empty string
    this.startGame()
  }
  //Pushes a player object based on Player interface layout to players variable
  
  //runs the getQuestions function from questionsService and saves the results to the questions variable array
  getQuestions(): void {
    this.questions = this.gameService.questions;
  }
  
  //changes isGameStarted to true so long as there is a player for rendering questions, sets first questions and player
  startGame(): void {
    this.gameService.startGame();
    this.questions = this.gameService.questions
    this.activePlayer = this.gameService.activePlayer
    this.activeQuestion = this.gameService.activeQuestion;
    this.players = this.gameService.players;
    this.isGameStarted = this.gameService.isGameStarted;
  }
  //runs nextQuestion from game-controller service and pulls the active player and active question values
  nextQuestion(): void {
    this.gameService.nextQuestion();
    this.activePlayer = this.gameService.activePlayer;
    this.activeQuestion = this.gameService.activeQuestion;
    this.resetTurn();
  }
  //runs setSelected from game-controller service and pulls the selectedAnswer and canSubmit values
  setSelected(a: any): void{
    if (!this.isAnswerSubmitted()){
    this.gameService.setSelected(a);
    this.selectedAnswer = this.gameService.selectedAnswer;
    this.canSubmit = this.gameService.canSubmit;
    }
    
  }
  //used to change color of answers based on if amISelected() returns true or false
  amISelected(a: any){
    return this.gameService.amISelected(a);
  }
  
  submitAnswer(a: any) {
    this.gameService.submitAnswer(a);
    this.calculateScore(this.activePlayer, this.activeQuestion, a);
    this.canSubmit = this.gameService.canSubmit
  }

  isAnswerSubmitted(){
    return this.gameService.isAnswerSubmitted();
  }
  
  resetTurn(){
    this.selectedAnswer = this.gameService.selectedAnswer;
  }

  calculateScore(p: Player[], q:any, a: any) {
    let currentPlayerIndex = this.players.indexOf(this.activePlayer);
    this.players[currentPlayerIndex] = this.playerService.calculateScore(p, q, a);
  }

  displayCurrentPlayerScore(){
    let score = this.activePlayer.stats.questionsRight.length;
    return `Current Score: ${score}/${this.questions[0].length}` 
  }

  whoIsWinning(){
    let winning = this.players[0];
    let tieArray = [];
    this.players.forEach(p => {
      if (p.stats.questionsRight.length > winning.stats.questionsRight.length){
        winning = p;
        tieArray[0] = p;
      } else if (p.stats.questionsRight.length === winning.stats.questionsRight.length){
        tieArray.push(p);
      }
    })
    if (tieArray.length > 1){
      if (tieArray.length > 2){
        return `It's a tie between ${tieArray[0].displayName}, ${tieArray[1].displayName} and ${tieArray[2].displayName}!`
      } else {
        return `It's a tie between ${tieArray[0].displayName} and ${tieArray[1].displayName}!`
      }
    } else {
      return `${winning.displayName} is currently in the lead!`
    } 
  }


}
