import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  selectedCount: string;
  playerCount: any[] = [
    1, 
    2, 
    3
  ]

  selectedCategory: string;
  categoryTitle: any[] = [];
  categories: any[] = [
    {categoryNumber: 1, title: "Any Category"},
    {categoryNumber: 9, title: "General Knowledge"},
    {categoryNumber: 10, title: "Entertainment: Books"},
    {categoryNumber: 11, title: "Entertainment: Film"},
    {categoryNumber: 12, title: "Entertainment: Music"},
    {categoryNumber: 13, title: "Entertainment: Musicals & Theatres"},
    {categoryNumber: 14, title: "Entertainment: Television"},
    {categoryNumber: 15, title: "Entertainment: Video Games"},
    {categoryNumber: 16, title: "Entertainment: Board Games"},
    {categoryNumber: 17, title: "Science and Nature"},
    {categoryNumber: 18, title: "Science: Computers"},
    {categoryNumber: 19, title: "Science: Mathematics"},
    {categoryNumber: 20, title: "Mythology"},
    {categoryNumber: 21, title: "Sports"},
    {categoryNumber: 22, title: "Geography"},
    {categoryNumber: 23, title: "History"},
    {categoryNumber: 24, title: "Politics"},
    {categoryNumber: 25, title: "Art"},
    {categoryNumber: 26, title: "Celebrities"},
    {categoryNumber: 27, title: "Animals"},
    {categoryNumber: 28, title: "Vehicles"},
    {categoryNumber: 29, title: "Entertainment: Comics"},
    {categoryNumber: 30, title: "Science: Gadgets"},
    {categoryNumber: 31, title: "Entertainment: Japanese Anime and Manga"},
    {categoryNumber: 32, title: "Entertainment: Cartoon & Animations"},
  ]
  
  selectedDifficulty: string;
  difficulty: any[] = [
    "Easy",
    "Medium",
    "Hard",
  ]

  selectedQuestionType: string;
  type: any[] = [];
  questionType: any[] = [
    {apiType: '', type: 'Any Type'},
    {apiType: 'multiple', type: 'Multiple Choice'},
    {apiType: 'boolean', type: 'True / False'},
  ]

  constructor() { }

  ngOnInit(): void {
    this.getDropdownData()
  }

  getDropdownData() {
    this.categories.forEach(category => {
      this.categoryTitle.push(category.title)
    });
    this.questionType.forEach(difficulty => {
      this.type.push(difficulty.type)
    })
    console.log(this.categoryTitle)
    console.log(this.type)
  }

}
