import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'app-trivia-page',
  templateUrl: './trivia-page.component.html',
  styleUrls: ['./trivia-page.component.scss']
})
export class TriviaPageComponent implements OnInit {

  questions: any[] = [];
  
  constructor(public questionsService: QuestionsService) { }

  ngOnInit(): void {
    this.getQuestions({amount: 10, category: '', difficulty: '', type: ''})
  }

  getQuestions(params: any): void{
    this.questionsService.getQuestions(params)
    .subscribe((response: any) => {
      this.questions = response.results;
    })
  }

}
