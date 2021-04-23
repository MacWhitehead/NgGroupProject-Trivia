import { Injectable } from '@angular/core';
import { QuestionsService } from '../services/questions.service';
import { Player } from '../interfaces/player';

@Injectable({
  providedIn: 'root',
})
export class GameControllerService {
  turnNumber: number;
  answerSubmitted: boolean;
  canSubmit: boolean;
  selectedAnswer: any;
  activeQuestion: any;
  activePlayer: any;
  players: Player[] = [];
  questions: any[] = [];
  isGameStarted: boolean;

  constructor(public questionsService: QuestionsService) {}

  addPlayer(p: string) {
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
      },
    });
    return this.players;
  }
  //runs the getQuestions function from questionsService and saves the results to the questions variable array
  getQuestions(params: any): void {
    this.questions.length = params.playerCount
    for (let player = 0; player < params.playerCount; player++){
      this.questionsService.getQuestions(params).subscribe((response: any) => {
        response.results = this.combineAnswers(response.results);
        this.questions[player] = response.results;
        console.log(this.questions);
      });
    }
  }
  //loops through all questions and puts correct answers into an array, shuffles them and adds the shuffled array as a property to each question
  combineAnswers(questions: any) {
    questions.forEach((q) => {
      let answers = [];
      answers.push({ correct: true, value: q.correct_answer });
      q.incorrect_answers.forEach((a) =>
        answers.push({ correct: false, value: a })
      );
      answers = this.shuffleArray(answers);
      q.answersArray = answers;
    });
    return questions;
  }

  shuffleArray(arr: any[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  //changes isGameStarted to true so long as there is a player for rendering questions, sets first questions and player
  startGame(): void {
    if (this.players.length > 0) {
      this.isGameStarted = true;
    }
    this.activePlayer = this.players[0];
    let indexOfPlayer = this.players.indexOf(this.activePlayer);
    this.activeQuestion = this.questions[indexOfPlayer][0];
    this.turnNumber = 0;
    console.log(`active player = ${this.activePlayer}`)
    console.log(`active question = ${this.activeQuestion}`)
  }

  nextQuestion(): void {
    /* ----- VARIABLES FOR NEXTQUESTION LOGIC START ----- */
    ///IS COMPLETELY BROKEN NEED TO DO THE FOLLOWING 
    /* 
    1. Take into account which turn it is. Turn needs to be defined by the index of the active question in the player array
    2. Needs logic to say if active player is 4, increase the current question value + 1. Use a flag to signify what turn it is in this service. 
    3. 
    */


  
    let currentPlayerIndex = this.players.indexOf(this.activePlayer)
    let currentQuestionIndex = this.questions[currentPlayerIndex].indexOf(this.activeQuestion);
    let currentQuestion = this.questions[currentPlayerIndex][this.turnNumber]
    let lastQuestionForTurn = this.questions[this.players.length - 1][this.turnNumber];
    let lastQuestionForGame = this.questions[this.players.length-1][this.questions[0].length - 1]
    let currentPlayer = this.players[currentPlayerIndex];
    let lastPlayer = this.players[this.players.length - 1];
    let nextQuestion;
    let nextPlayer;
    /* ----- VARIABLES FOR NEXTQUESTION LOGIC END ----- */

    /* ----- IF LAST QUESTION DO NOTHING FOR NOW ----- */
    if (currentQuestion === lastQuestionForGame && currentPlayer === lastPlayer) {
      console.log('First');
      this.activeQuestion = this.activeQuestion;
      this.activePlayer = this.activePlayer;
      
    } else if (
      /* ----- IF LAST PLAYER IN ARRAY AND NOT LAST QUESTION IN GAME, NEXT PLAYER IS FIRST PLAYER ----- */
      currentPlayer === lastPlayer &&
      currentQuestion === lastQuestionForTurn
    ) {
      console.log('Second');
      this.activePlayer = this.players[0];
      this.turnNumber += 1;
      nextQuestion = this.questions[0][this.turnNumber];
      this.activeQuestion = nextQuestion;
      
    } else if (
      /* ----- IF NOT LAST PLAYER IN ARRAY AND NOT LAST QUESTION SET NEXT PLAYER AND NEXT QUESTION ----- */
      currentPlayer !== lastPlayer &&
      currentQuestion !== lastQuestionForTurn
    ) {
      console.log('Third');
      nextPlayer = this.players[currentPlayerIndex + 1];
      nextQuestion = this.questions[currentPlayerIndex + 1][this.turnNumber];
      this.activePlayer = nextPlayer;
      this.activeQuestion = nextQuestion;
    }
    this.resetTurn();
  }

  setSelected(a: any): void {
    this.selectedAnswer = a;
    this.canSubmit = true;
  }

  amISelected(a: any) {
    if (this.selectedAnswer === a) {
      return true;
    } else {
      return false;
    }
  }

  submitAnswer(a: any): void {
    this.answerSubmitted = true;
  }

  isAnswerSubmitted() {
   
    if (this.answerSubmitted == true) {
      return true;
    } else return false;
  }

  resetTurn(){
    this.answerSubmitted = false;
    this.selectedAnswer = {}; 
    this.canSubmit = false;
  }

  calculateScore(){
    
  }
}