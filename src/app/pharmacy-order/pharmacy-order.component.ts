import { Component, OnInit, ElementRef, Renderer, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/merge';

import { OrderService } from '../order.service';
import { Order } from '../order';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'sy-pharmacy-order',
  templateUrl: './pharmacy-order.component.html',
  styles: []
})
export class PharmacyOrderComponent implements OnInit, OnDestroy {

  private orderList1: Order[] = [];
  private colapse1: boolean[] = [];
  private loading1: boolean = true;
  private orderList2: Order[] = [];
  private colapse2: boolean[] = [];
  private loading2: boolean = true;
  private orderSubscription1: Subscription;
  private orderSubscription2: Subscription;
  private loggedInUser: User;


  constructor(private orderService: OrderService, private renderer: Renderer, private authService: AuthenticationService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.loggedInUser = this.userService.getUserProfileFromLocalStorage();
    this.orderSubscription1 = this.orderService.getPendingOrders().subscribe(
      (data) => {
        this.loading1 = false;
        this.orderList1 = data.reverse();
        for (let i = 0; i < this.orderList1.length; i++) {
          this.colapse1.push(true);
        }
      },
      (error) => console.log(error)
    )
    this.orderSubscription2 = this.orderService.getOrdersOfPharmacy(this.loggedInUser['displayName']).subscribe(
      (data) => {
        this.loading2 = false;
        this.orderList2 = data.reverse();
        for (let i = 0; i < this.orderList2.length; i++) {
          this.colapse2.push(true);
        }
      },
      (error) => console.log(error)
    )
  }

  acceptOrder(orderId: string) {
    this.orderService.acceptOrder(orderId, this.loggedInUser['displayName'])
  }

  ngOnDestroy() {
    this.orderSubscription1.unsubscribe();
    this.orderSubscription2.unsubscribe();
  }

  showDetails1(collapseable: ElementRef, i: number) {
    this.colapse1[i] = !this.colapse1[i];
    this.renderer.setElementClass(collapseable, 'collapse', this.colapse1[i]);
  }

  showDetails2(collapseable: ElementRef, i: number) {
    this.colapse2[i] = !this.colapse2[i];
    this.renderer.setElementClass(collapseable, 'collapse', this.colapse2[i]);
  }
}
