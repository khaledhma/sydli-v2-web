import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { OfflineService } from './offline.service';
import { AuthenticationService } from './authentication.service';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'sy-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  private isOffline: boolean = false;
  private loggedInUser: User;
  private loggedin: boolean = false;
  private subscription: Subscription;
  private uid: string = "";

  constructor (private offlineService: OfflineService, private authService: AuthenticationService, private userService: UserService) {}

  ngOnInit() {
    this.subscription = this.authService.isAuthenticated().subscribe(
      (isLogged) => {
        this.loggedin = isLogged;
        if (isLogged) {
          this.loggedInUser = this.userService.getUserProfileFromLocalStorage();
          this.uid = this.loggedInUser['uid'];
          this.offlineService.saveConnection(this.uid);
        } else {
          this.uid = "";
        }
      },
      (error) => console.log('errrrorrrrrrrrrr', error)
    );

    this.offlineService.isOffline().subscribe(
      (status) => {
        this.isOffline = !status.$value;
        console.log(!status.$value);
      }
    )
  }
}
