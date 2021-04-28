import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor() {}

  calculateScore(p: any, q: any, a: any) {
    console.log(p);
    console.log(q);
    console.log(a);
    if (q.correct_answer === a.value) {
      console.log('CORRECT');
      //IF QUESTIONS RIGHT CONTAINS AN EXISTING ENTRY WITH THAT CATEGORY, INCREMENT COUNT BY 1
      if (
        p.stats.questionsRight.filter((i) => i.category === a.category).length >
        0
      ) {
        console.log('CONTAINS ALREADY');
        let index = p.stats.questionsRight.findIndex(
          (i) => i.category === a.category
        );
        
        console.log(p.stats.questionsWrong)
        console.log(index)
        p.stats.questionsWrong[index].count += 1;
      } //IF QUESTIONS RIGHT DOESNT CONTAIN AN EXISTING ENTRY WITH THAT CATEGORY, CREATE ENTRY WITH VALUE 1
      else if (
        p.stats.questionsRight.filter((i) => i.category === a.category)
          .length === 0
      ) {
        console.log('DOESNT CONATAIN');
        p.stats.questionsRight.push({ category: a.category, count: 1 });
      }
    } else if (q.correct_answer !== a.value) {
      console.log('NOT CORRECT');
      if (
        p.stats.questionsWrong.filter((i) => i.category === a.category).length >
        0
      ) {
        console.log('CONTAINS ALREADY');
        //IF QUESTIONS WRONG CONTAINS AN EXISTING ENTRY WITH THAT CATEGORY, INCREMENT COUNT BY 1
        let index = p.stats.questionsWrong.findIndex(
          (i) => i.category === a.category
        );
        
        console.log(p.stats.questionsWrong)
        console.log(index)
        p.stats.questionsWrong[index].count += 1;
      } //IF QUESTIONS RIGHT DOESNT CONTAIN AN EXISTING ENTRY WITH THAT CATEGORY, CREATE ENTRY WITH VALUE 1
      else if (
        p.stats.questionsWrong.filter((i) => i.category === a.category)
          .length === 0
      ) {
        console.log('DOESNT CONATAIN');
        p.stats.questionsWrong.push({ category: a.category, count: 1 });
      }
    }
    console.log(p);
    return p;
  }
}
