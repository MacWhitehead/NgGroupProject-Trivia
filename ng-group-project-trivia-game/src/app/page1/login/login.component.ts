import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  users: Observable<any>;

  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.getUsers().subscribe(users => {
      console.log(users)
    })
  }

}
