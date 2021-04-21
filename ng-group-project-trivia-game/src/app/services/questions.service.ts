import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) {}

  getQuestions(params: any): Observable<any> {
    //Check if param is empty or not
    let amount: string;
    let category: string;
    let difficulty: string;
    let type: string;

    if (params.amount !== ''){
      amount = 'amount=' + params.amount + '&';
    } else {
      amount = '';
    }

    if (params.category !== '') {
      category = 'category=' + params.category + '&';
    } else {
      category = '';
    }

    if (params.difficulty !== '') {
      difficulty = 'difficulty=' + params.difficulty + '&';
    } else {
      difficulty = '';
    }

    if (params.type !== '') {
      type = 'type=' + params.type + '&';
    } else {
      type = '';
    }

    //Build url suffix
    let apiUrl: string = `https://opentdb.com/api.php?${amount}${category}${difficulty}${type}`;
    console.log(apiUrl)
    return this.http.get(apiUrl);
  }

}
