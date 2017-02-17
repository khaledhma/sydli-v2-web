import { Component, OnInit, ElementRef, Renderer, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { OrderService } from '../order.service';
import { Order } from '../order';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'sy-my-orders',
  templateUrl: './my-orders.component.html',
  styles: []
})
export class MyOrdersComponent implements OnInit, OnDestroy {

  private orderList: Order[] = [];
  private colapse: boolean[] = [];
  private loading: boolean = true;
  private orderSubscription: Subscription;
  private loggedInUser: User;


  constructor(private orderService: OrderService, private renderer: Renderer, private authService: AuthenticationService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.loggedInUser = this.userService.getUserProfileFromLocalStorage();
    this.orderSubscription = this.orderService.getOrdersOfUser(this.loggedInUser['uid']).subscribe(
      (data) => {
        this.loading = false;
        this.orderList = data.reverse();
        for (let i = 0; i < this.orderList.length; i++) {
          this.colapse.push(true);
        }
      },
      (error) => console.log(error)
    )
  }

  ngOnDestroy() {
    this.orderSubscription.unsubscribe();
  }

  showDetails(collapseable: ElementRef, i: number) {
    this.colapse[i] = !this.colapse[i];
    this.renderer.setElementClass(collapseable, 'collapse', this.colapse[i]);
  }

}
