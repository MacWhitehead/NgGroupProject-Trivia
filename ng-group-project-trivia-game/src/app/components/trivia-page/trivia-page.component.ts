import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/questions.service';
import { Player } from '../../interfaces/player';
@Component({
  selector: 'app-trivia-page',
  templateUrl: './trivia-page.component.html',
  styleUrls: ['./trivia-page.component.scss'],
})
export class TriviaPageComponent implements OnInit {
  activeQuestion: any;
  activePlayer: any;
  players: Player[] = [];
  questions: any[] = [];
  isGameStarted: boolean;

  constructor(public questionsService: QuestionsService) {}

  ngOnInit(): void {
    //getQuestions service logic currently depends on having each property defined in the parameter. "any" value is take as empty string
    this.getQuestions({ amount: 10, category: '', difficulty: '', type: '' });
    this.isGameStarted = false;
  }
  //Pushes a player object based on Player interface layout to players variable
  addPlayer(p: string): void {
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
  }
  //runs the getQuestions function from questionsService and saves the results to the questions variable array
  getQuestions(params: any): void {
    this.questionsService.getQuestions(params).subscribe((response: any) => {
      console.log(response.results);
      response.results = this.combineAnswers(response.results)
      this.questions = response.results;
    });
  }
  //loops through all questions and puts correct answers into an array, shuffles them and adds the shuffled array as a property to each question
  combineAnswers(questions: any): void {
    questions.forEach(q => {
      let answers = [];
      answers.push({correct: true, value: q.correct_answer});
      q.incorrect_answers.forEach(a => answers.push({correct: false, value: a}))
      answers = this.shuffleArray(answers)
      q.answersArray = answers;
    })
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
    this.activeQuestion = this.questions[0];
    this.activePlayer = this.players[0];
  }

  nextQuestion(): void {
    /* ----- VARIABLES FOR NEXTQUESTION LOGIC START ----- */
    let currentQuestion = this.questions[
      this.questions.indexOf(this.activeQuestion)
    ];
    let lastQuestion = this.questions[this.questions.length - 1];
    let currentPlayer = this.players[this.players.indexOf(this.activePlayer)];
    let lastPlayer = this.players[this.players.length - 1];
    let nextQuestion;
    let nextPlayer;
    /* ----- VARIABLES FOR NEXTQUESTION LOGIC END ----- */

    /* ----- IF LAST QUESTION DO NOTHING FOR NOW ----- */
    if (currentQuestion === lastQuestion) {
      console.log('First');
      this.activeQuestion = this.activeQuestion;
      this.activePlayer = this.activePlayer;
    } else if (
      /* ----- IF LAST PLAYER IN ARRAY AND NOT LAST QUESTION, NEXT PLAYER IS FIRST PLAYER ----- */
      currentPlayer === lastPlayer &&
      currentQuestion !== lastQuestion
    ) {
      console.log('Second');
      this.activePlayer = this.players[0];
      nextQuestion = this.questions[
        this.questions.indexOf(this.activeQuestion) + 1
      ];
      this.activeQuestion = nextQuestion;
    } else if (
    /* ----- IF NOT LAST PLAYER IN ARRAY AND NOT LAST QUESTION SET NEXT PLAYER AND NEXT QUESTION ----- */
      currentPlayer !== lastPlayer &&
      currentQuestion !== lastQuestion
    ) {
      console.log('Third');
      nextPlayer = this.players[this.players.indexOf(this.activePlayer) + 1];
      nextQuestion = this.questions[
        this.questions.indexOf(this.activeQuestion) + 1
      ];
      this.activePlayer = nextPlayer;
      this.activeQuestion = nextQuestion;
    }
  }
}
