import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  users: User[];
  emails: String[];
  host: User = {
    displayName: '',
    email: '',
    photoURL: '',
    totalGamesPlayed: 0,
    totalGamesWon: 0,
    totalGamesLost: 0,
    totalQuestionsAnswered: 0,
    totalRightAnswers: 0,
    totalWrongAnswers: 0,
    bestCategory: '',
    worstCategory: '',
  };

  loggingIn() {
    this.authService.GoogleAuthLogin()
      .then(() => {
        // console.log(this.authService.host)
        this.host = this.authService.host
        this.emails = this.users.map(user => user.email)
      })
      .then(() => {
        if (this.emails.includes(this.host.email)) {
          
        } 
      })

  }

  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.getUsers().subscribe(users => {
      // console.log(users)
    })
  }

}
