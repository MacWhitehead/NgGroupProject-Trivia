import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
  categoryData: any;
  bestCategory: any;
  worstCategory: any;
  photoURL: any;
  displayName: any;
  totalGames: any;
  questionsAnswered: any;

  constructor(
    public hostService: HostService,
    public authService: AuthService,
    public afs: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.getPlayerData();
  }

  getPlayerData() {
    let playerData = this.afs.collection('users', (ref) =>
      ref.where('id', '==', this.hostService.hostPlayer.id)
    );
    playerData.snapshotChanges().subscribe((res) => {
      this.userData = res[0].payload.doc.data();
      this.assignData();
    });
  }

  getRightQuestionCount() {
    let questionsRight = this.userData.stats.questionsRight;
    let count = 0;
    for (let i = 0; i < questionsRight.length; i++) {
      count += questionsRight[i].count;
    }
    return count;
  }

  getBestCategory() {
    let questionsRight = this.userData.stats.questionsRight;
    let best = { category: '', count: 0 };
    for (let i = 0; i < questionsRight.length; i++) {
      if (questionsRight[i].count > best.count) {
        best = questionsRight[i];
      }
      return best.category;
    }
  }

  getWorstCategory() {
    let questionsWrong = this.userData.stats.questionsWrong;
    let worst = { category: '', count: 0 };
    for (let i = 0; i < questionsWrong.length; i++) {
      if (questionsWrong[i].count > worst.count) {
        worst = questionsWrong[i];
      }
      return worst.category;
    }
  }

  assignData() {
    let wins = this.userData.stats.gamesWon;
    let correctAnswers = this.getRightQuestionCount();
    this.totalGames = this.userData.stats.gamesPlayed;
    this.questionsAnswered = this.userData.stats.questionsAnswered;
    this.winLossPercent = (wins / this.totalGames) * 100;
    this.correctIncorrectPercent =
      (correctAnswers / this.questionsAnswered) * 100;
    this.bestCategory = this.getBestCategory();
    this.worstCategory = this.getWorstCategory();
    if (this.bestCategory == this.worstCategory) {
      this.bestCategory = 'Play more games for more accurate data';
      this.worstCategory = '';
    }
    this.photoURL = this.userData.photoURL;
    this.displayName = this.userData.displayName;
  }
}
