import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-sign-in-up',
  templateUrl: './sign-in-up.component.html',
  styleUrl: './sign-in-up.component.scss'
})
export class SignInUpComponent {
  isLogin: boolean = true;
  emailID: string = "";
  password: any;

  constructor(public _loginAuthService: AuthService) { }

  signUp() {
    this._loginAuthService.signUpWithEmailPassword(this.emailID, this.password);
  }

  signIn() {
    this._loginAuthService.signInWithEmailPassword(this.emailID, this.password);
  }

  googleService() {
    this._loginAuthService.signInWithGoogle();
  }

  getInfo() {
    this._loginAuthService.getUserInfo();
  }
}
