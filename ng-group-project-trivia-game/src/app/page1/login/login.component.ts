import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usersRef: any;

  constructor(
    public authService: AuthService,
  ) { 
    this.usersRef = authService.db.list('users')
  }

  ngOnInit(): void {
    this.usersRef = this.authService.db.list('users');
  }

}
