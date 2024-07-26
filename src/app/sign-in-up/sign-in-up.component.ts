import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-in-up',
  templateUrl: './sign-in-up.component.html',
  styleUrl: './sign-in-up.component.scss'
})
export class SignInUpComponent {
  isLogin: boolean = true;
  name: string = "";
  emailID: string = "";
  password: string = "";
  emailRegex: any = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  constructor(
    public _loginAuthService: AuthService,
    private _toastr: ToastrService,
    private _router: Router,
  ) { }

  signUp() {

    if (!this.emailID || !this.password || !this.name) {
      this._toastr.error("Please provide all the information", "Error");
      return;
    }

    if (!this.emailRegex.test(this.emailID)) {
      this._toastr.error("Invalid email format", "Error");
      return;
    }

    this._loginAuthService.signUpWithEmailPassword(this.emailID, this.password, this.name);
    this.clearAllInfo();
  }

  signIn() {
    if (!this.emailID || !this.password) {
      this._toastr.error("Please provide all the information", "Error");
      return;
    }

    if (!this.emailRegex.test(this.emailID)) {
      this._toastr.error("Invalid email format", "Error");
      return;
    }
    this._loginAuthService.signInWithEmailPassword(this.emailID, this.password);
    this.clearAllInfo();
  }

  googleService() {
    this._loginAuthService.signInWithGoogle();
  }

  signOut() {
    this._loginAuthService.singOut();
  }

  clearAllInfo() {
    this.emailID = "";
    this.password = "";
    this.name = "";
  }
}
