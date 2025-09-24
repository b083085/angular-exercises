import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService, UserType } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userTypes: UserType[] = ['guest', 'member', 'admin'];
  currentUserType: UserType = 'guest';

  constructor(private auth: AuthService) {
    this.currentUserType = this.auth.userType;
    this.auth.userType$.subscribe(type => this.currentUserType = type);
  }

  setUserType(type: UserType) {
    this.auth.setUserType(type);
  }
}
