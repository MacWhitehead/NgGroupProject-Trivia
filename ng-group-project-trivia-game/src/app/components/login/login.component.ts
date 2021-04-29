import { Component, OnInit, ResolvedReflectiveFactory } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from './auth.service';
import { HostService } from '../../services/host.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  users: User[];
  emails: String[];

  loggingIn() {
    this.authService.GoogleAuthLogin().then(() => {
      if (this.emails.includes(this.authService.host.email)) {
        console.log(
          `Found you! You're signed in as ${this.authService.host.displayName} :)`
        );
        this.users.forEach((x) => {
          if (x.email == this.authService.host.email) {
            this.hostService.setHostPlayer({
              displayName: x.displayName,
              email: x.email,
              photoURL: x.photoURL,
              stats: {
                gamesPlayed: x.stats.gamesPlayed,
                gamesWon: x.stats.gamesWon,
                gamesLost: x.stats.gamesLost,
                questionsAnswered: x.stats.questionsAnswered,
                questionsRight: x.stats.questionsRight,
                questionsWrong: x.stats.questionsWrong,
                bestCategory: x.stats.bestCategory,
                worstCategory: x.stats.worstCategory,
              },
            });
          }
        });
        // console.log(this.hostService.hostPlayer)
        // console.log(this.hostService.nonHostPlayers);
        this.router.navigate(['user-details']);
      } else {
        console.log(
          `New user added to database :) ${this.authService.host.displayName}`
        );
        this.authService.addUser()
        this.hostService.setHostPlayer({
          displayName: this.authService.host.displayName,
          email: this.authService.host.email,
          photoURL: this.authService.host.photoURL,
          stats: {
            gamesPlayed: 0,
            gamesWon: 0,
            gamesLost: 0,
            questionsAnswered: 0,
            questionsRight: [],
            questionsWrong: [],
            bestCategory: '',
            worstCategory: '',
          },
        })
        console.log(this.hostService.hostPlayer)
        console.log(this.hostService.nonHostPlayers);
        this.router.navigate(['user-details']);
      }
    });
  }

  constructor(
    public authService: AuthService,
    public hostService: HostService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getUsers().subscribe((users: any) => {
      this.users = users;
      this.emails = this.users.map((user) => user.email);
      this.hostService.allPlayers = users;
      // console.log(this.hostService.allPlayers);
    });
  }
}
