import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { AuthenticationService } from '../authentication.service'

@Component({
  selector: 'sy-authentication',
  templateUrl: './authentication.component.html',
  styles: [`.open {display: block;}
            .close {display: none;}
    `]
})
export class AuthenticationComponent implements OnInit {

  private isOpen: boolean = false;
  private subscription: Subscription;
  private showLogin: boolean = true;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.subscription = this.authService.openLogin.subscribe(
      (value) => {
        this.isOpen = value;
        this.showLogin = true;
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  show(value: string) {
    if (value === 'signup') {
      this.showLogin = false;
    }
    if (value === 'login') {
      this.showLogin = true;
    }

  }


  switchToLogin() {
    this.showLogin=true;
  }


}
