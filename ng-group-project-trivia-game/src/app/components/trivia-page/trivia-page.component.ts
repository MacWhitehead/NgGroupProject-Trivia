import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'app-trivia-page',
  templateUrl: './trivia-page.component.html',
  styleUrls: ['./trivia-page.component.scss']
})
export class TriviaPageComponent implements OnInit {




  constructor(public questionsService: QuestionsService) { }

  ngOnInit(): void {
  }

  
  
}
