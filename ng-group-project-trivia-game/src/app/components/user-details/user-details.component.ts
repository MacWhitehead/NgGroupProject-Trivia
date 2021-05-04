import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Player } from 'src/app/interfaces/player';
import { HostService } from 'src/app/services/host.service';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  winLossPercent: number = 0;
  correctIncorrectPercent: number = 0;
  userData: any;
  // categoryData: any[] = [];
  categoryData: any;
  bestCategory: '';
  worstCategory: '';

  constructor(
    public hostService: HostService,
    public authService: AuthService,
    public afs: AngularFirestore, 
  ) {}

  ngOnInit(): void {
    this.getPlayerData();
  }

  getPlayerData() {
   let playerData = this.afs.collection('users', ref => ref.where("id", "==", this.hostService.hostPlayer.id))
   playerData.snapshotChanges().subscribe(res => {
    this.userData = res[0].payload.doc.data();
    this.getPercentages();
     console.log(res[0].payload.doc.data())
   })
  }

  getRightQuestionCount() {
    let questionsRight = this.userData.stats.questionsRight;
    console.log(questionsRight)
    let count = 0;
    for(let i = 0; i < questionsRight.length; i++) {
      count += questionsRight[i].count;
      this.categoryData.push([questionsRight[i].count, questionsRight[i].category])
    }
    return count;
  }

  // getCategories() {

  // }

  getPercentages() {
    let wins = this.userData.stats.gamesWon;
    let totalGames = this.userData.stats.gamesPlayed;
    let questionTotal = this.userData.stats.questionsAnswered;
    let correctAnswers = this.getRightQuestionCount();
    //Need a function to calculate worst and best category.
    this.winLossPercent = (wins / totalGames) * 100;
    this.correctIncorrectPercent = (correctAnswers / questionTotal) * 100;
    console.log(this.winLossPercent, this.correctIncorrectPercent);
    console.log(questionTotal, correctAnswers)
    console.log(this.categoryData)
  }
}
