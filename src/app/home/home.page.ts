import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  loginUser = {
    username: '',
    password: ''
  };
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  login( fLogin: NgForm) {
    console.log( fLogin.valid);
    console.log(this.loginUser);
    if(fLogin.valid){
      this.auth.postLogin(this.loginUser);
    }
  }

}
