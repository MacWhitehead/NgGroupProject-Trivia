import { Injectable, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { QuestionsService } from '../services/questions.service';
import { Player } from '../interfaces/player';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { shareReplay, } from 'rxjs/operators';
import { AuthService } from '../components/login/auth.service';
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

  constructor(
    public questionsService: QuestionsService,
    private router: Router,
    public afs: AngularFirestore,
    public authService: AuthService
  ) {}

  addPlayer(p: any) {
    this.players.push(p);
  }
  //runs the getQuestions function from questionsService and saves the results to the questions variable array
  getQuestions(params: any): void {
    this.questions.length = params.playerCount;
    for (let player = 0; player < params.playerCount; player++) {
      this.questionsService.getQuestions(params).subscribe((response: any) => {
        response.results = this.combineAnswers(response.results);
        this.questions[player] = response.results;

        if (this.questions[params.playerCount - 1] !== []) {
          this.router.navigate(['trivia-page']);
        }
      });
    }
  }
  //loops through all questions and puts correct answers into an array, shuffles them and adds the shuffled array as a property to each question
  combineAnswers(questions: any) {
    questions.forEach((q) => {
      let answers = [];
      answers.push({
        correct: true,
        value: q.correct_answer,
        category: q.category,
      });
      q.incorrect_answers.forEach((a) =>
        answers.push({ correct: false, value: a, category: q.category })
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
  }

  nextQuestion(): void {
    /* ----- VARIABLES FOR NEXTQUESTION LOGIC START ----- */

    let currentPlayerIndex = this.players.indexOf(this.activePlayer);

    let currentQuestion = this.questions[currentPlayerIndex][this.turnNumber];

    let lastQuestionForTurn = this.questions[this.players.length - 1][
      this.turnNumber
    ];

    let lastQuestionForGame = this.questions[this.players.length - 1][
      this.questions[0].length - 1
    ];
    let currentPlayer = this.players[currentPlayerIndex];
    let lastPlayer = this.players[this.players.length - 1];
    let nextQuestion;
    let nextPlayer;
    /* ----- VARIABLES FOR NEXTQUESTION LOGIC END ----- */

    /* ----- IF LAST QUESTION DO NOTHING FOR NOW ----- */
    if (
      currentQuestion === lastQuestionForGame &&
      currentPlayer === lastPlayer
    ) {
      this.getResults(this.players);
    } else if (
      /* ----- IF LAST PLAYER IN ARRAY AND NOT LAST QUESTION IN GAME, NEXT PLAYER IS FIRST PLAYER ----- */
      currentPlayer === lastPlayer &&
      currentQuestion === lastQuestionForTurn
    ) {
      this.activePlayer = this.players[0];
      this.turnNumber += 1;
      nextQuestion = this.questions[0][this.turnNumber];
      this.activeQuestion = nextQuestion;
      this.resetTurn();
    } else if (
      /* ----- IF NOT LAST PLAYER IN ARRAY AND NOT LAST QUESTION SET NEXT PLAYER AND NEXT QUESTION ----- */
      currentPlayer !== lastPlayer &&
      currentQuestion !== lastQuestionForTurn
    ) {
      nextPlayer = this.players[currentPlayerIndex + 1];
      nextQuestion = this.questions[currentPlayerIndex + 1][this.turnNumber];
      this.activePlayer = nextPlayer;
      this.activeQuestion = nextQuestion;
      this.resetTurn();
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
    if (this.selectedAnswer !== '') {
      this.answerSubmitted = true;
      this.canSubmit = false;
    }
  }

  isAnswerSubmitted() {
    if (this.answerSubmitted == true) {
      return true;
    } else return false;
  }

  resetTurn() {
    this.answerSubmitted = false;
    this.selectedAnswer = '';
  }

  getResults(pd: any[]){
    console.log(pd)
    let fsData = [];
    this.authService.getUsers().subscribe((users: any) => {
      pd.forEach(p => {
        let found = users.find(u => u.email === p.email);
        fsData.push(found);
        console.log(fsData)
      })
  })

  fsData.forEach(u => {
    let player = pd.find(p => p.email === u.email)
    player.questionsRight.forEach(item => {
      if (u.questionsRight.includes(item)){
        let targetValue = u.questionsRight[u.questionsRight.indexOf(item)];
        targetValue.count += item.count;
        //save player data
      }
    })
  })
}

  savePlayerData(){}
}
