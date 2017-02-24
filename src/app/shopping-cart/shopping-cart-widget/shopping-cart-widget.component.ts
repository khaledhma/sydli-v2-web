import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { ShoppingListService } from '../shopping-list.service';
import { AuthenticationService } from '../../authentication.service';
import { ShoppingItem } from '../shopping-item';
import { User } from '../../user';
import { UserService } from '../../user.service';


@Component({
  selector: 'sy-shopping-cart-widget',
  templateUrl: './shopping-cart-widget.component.html',
  styles: []
})
export class ShoppingCartWidgetComponent implements OnInit {

  private itemCount: number = 0;
  private shoppingList: ShoppingItem[] = [];
  private subscription: Subscription;
  private isShown = false;
  private loggedin: boolean = false;
  private loggedInUser: User;

  constructor(private shoppingListService: ShoppingListService, private authService: AuthenticationService, private userService: UserService) { }

  ngOnInit() {
    this.subscription = this.authService.isAuthenticated().subscribe(
      (isLogged) => {
        this.loggedin = isLogged;
        if (isLogged) {
          this.loggedInUser = this.userService.getUserProfileFromLocalStorage();
          this.shoppingList = this.shoppingListService.getList(this.loggedInUser['uid']);
          this.itemCount = this.shoppingListService.getCurrentItemsCount();
          if (this.itemCount >= 1) {
            this.isShown = true;
          }
          if (this.itemCount == 0) {
            this.isShown = false;
          }
          this.subscription = this.shoppingListService.ItemsCount.subscribe(
            (count) => {
              this.itemCount = count;
              if (count >= 1) {
                this.isShown = true;
              }
              if (count == 0) {
                this.isShown = false;
              }
            }
          )
        } else {
          this.isShown = false;
        }
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
