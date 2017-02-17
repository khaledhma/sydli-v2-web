import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';
import { User } from '../user';
import { Address } from '../address';


@Component({
  selector: 'sy-user-profile',
  templateUrl: './user-profile.component.html',
  styles: []
})
export class UserProfileComponent implements OnInit, OnDestroy {

  private loggedInUser: User;
  private userInfo: User;
  private loading: boolean = true;
  private userProfileSubscription: Subscription;


  constructor(private router: Router, private authService: AuthenticationService, private userService: UserService) { }

  ngOnInit() {
    this.loggedInUser = this.userService.getUserProfileFromLocalStorage();
    this.getuserInfo(this.loggedInUser['uid']);
  }

  ngOnDestroy() {
    this.userProfileSubscription.unsubscribe();
  }


  getuserInfo(uid: string) {
    this.userProfileSubscription = this.userService.getUserProfile(uid).subscribe(
      (userData) => {
        this.loading = false;
        this.userInfo = new User(
          userData.displayName,
          userData.email,
          userData.$key,
          userData.mode,
          null,
          null
        );
      },
      (error) => {
        console.log(error)
      }
    );
  }

}
