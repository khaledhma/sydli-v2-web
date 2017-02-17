import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { ShoppingListService } from '../shopping-list.service';
import { AuthenticationService } from '../../authentication.service';
import { ShoppingItem } from '../shopping-item';
import { User } from '../../user';
import { UserService } from '../../user.service';


@Component({
  selector: 'sy-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styles: []
})
export class ShoppingCartListComponent implements OnInit {

  private shoppingList: ShoppingItem[] = [];
  private loggedInUser: User;

  constructor(private shoppingListService: ShoppingListService, private router: Router, private authService: AuthenticationService, private userService: UserService) { }

  ngOnInit() {
    this.loggedInUser = this.userService.getUserProfileFromLocalStorage();
    this.shoppingList = this.shoppingListService.getList(this.loggedInUser['uid']);

  }

  removeItem(item) {
    this.shoppingListService.removeItem(item,this.loggedInUser['uid']);
  }

  decrement(item) {
    this.shoppingListService.decrementItem(item,this.loggedInUser['uid']);
  }

  increment(item) {
    this.shoppingListService.incrementItem(item,this.loggedInUser['uid']);
  }

  checkout() {
    this.router.navigate(['shoppinglist','checkout']);
  }

  getTotal(): number {
    let total = 0;
    for(let i=0; i<this.shoppingListService.getCurrentItemsCount(); i++) {
      total = total + this.shoppingList[i]['medecineQty']*this.shoppingList[i]['medecinePrice'];
    }
    return total;
  }


}
