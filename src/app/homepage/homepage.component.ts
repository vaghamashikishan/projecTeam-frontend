import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  sidebarVisible: boolean = true;
  constructor(public _loginAuthService: AuthService) {
  }

  signOut() {
    this._loginAuthService.singOut();
  }
}
