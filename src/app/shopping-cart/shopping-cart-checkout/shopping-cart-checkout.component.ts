import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { ShoppingItem } from '../shopping-item';
import { ShoppingListService } from '../shopping-list.service';
import { AuthenticationService } from '../../authentication.service';
import { UserService } from '../../user.service';
import { User } from '../../user';
import { Address } from '../../address';
import { Order } from '../../order';
import { OrderService } from '../../order.service';


@Component({
  selector: 'sy-shopping-cart-checkout',
  templateUrl: './shopping-cart-checkout.component.html',
  styles: []
})
export class ShoppingCartCheckoutComponent implements OnInit, OnDestroy {

  private shoppingList: ShoppingItem[] = [];
  private user: any;
  private addressSelected: Address;
  private userInfo: User;
  private sending: boolean = false;
  private userProfileSubscription: Subscription;
  private loggedInUser: User;
  private uploadedImageUrl: string = "";
  private disbaleSend = false;


  constructor(private router: Router,
    private shoppingListService: ShoppingListService,
    private authService: AuthenticationService,
    private userService: UserService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.loggedInUser = this.userService.getUserProfileFromLocalStorage();
    this.shoppingList = this.shoppingListService.getList(this.loggedInUser['uid']);
    this.getuserInfo(this.loggedInUser['uid']);
  }

  ngOnDestroy() {
    this.userProfileSubscription.unsubscribe();
  }

  getuserInfo(uid: string) {
    this.userProfileSubscription = this.userService.getUserProfile(uid).subscribe(
      (userData) => {
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

  getTotal(): number {
    let total = 0;
    for (let i = 0; i < this.shoppingListService.getCurrentItemsCount(); i++) {
      total = total + this.shoppingList[i]['medecineQty'] * this.shoppingList[i]['medecinePrice'];
    }
    return total;
  }

  sendOrder() {
    this.sending = true;
    let order = new Order(this.loggedInUser['uid'], this.addressSelected, new Date().getTime(), undefined, undefined, undefined, this.shoppingList, this.getTotal(), this.uploadedImageUrl);
    console.log(order);
    this.orderService.sendOrder(order).then(
      (data) => {
        this.sending = false;
        this.shoppingListService.deleteList(this.loggedInUser['uid']);
        this.router.navigate(['myorders']);
      },
      (error) => console.log
    )
  }

  selectedAddress(address: Address) {
    console.log(address);
    if(address === null) {
      this.disbaleSend = true;
    } else {
      this.disbaleSend = false;
    }
    this.addressSelected = address;
  }
}
