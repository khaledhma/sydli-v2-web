import { Component, OnInit, ElementRef, Renderer, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Subscription } from 'rxjs/Rx';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { OrderService } from '../order.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'sy-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit, OnDestroy {

  private isOpen: boolean = false;
  private isMenueOpen: boolean = false;
  private subscription: Subscription;
  private urlSub: Subscription;
  private loggedin: boolean = false;
  private userName: string;
  private newOrderCount: number = 0;
  private loggedInUser: User;
  private isPharmacy: boolean = false;
  private currentLink: string = "Home";

  constructor(private renderer: Renderer,
    private authService: AuthenticationService,
    private orderService: OrderService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService) { }

  ngOnInit() {
    this.subscription = this.authService.isAuthenticated().subscribe(
      (isLogged) => {
        this.loggedin = isLogged;
        if (isLogged) {
          this.loggedInUser = this.userService.getUserProfileFromLocalStorage();
          this.userName = this.loggedInUser['displayName'];
          this.isPharmacy = this.loggedInUser['mode'] == 1 ? true : false;
          if (!this.isPharmacy) {
            this.orderService.getOrdersOfUser(this.loggedInUser['uid']).subscribe(
              (data) => {
                let filterData = data.filter((item) => {
                  return item['orderStatus'] == 'pending' ? true : false;
                });
                this.newOrderCount = filterData.length
              },
              (error) => console.log(error)
            )
          }
        } else {
          this.userName = "";
        }
      },
      (error) => console.log('errrrorrrrrrrrrr', error)
    );

    this.urlSub = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .mergeMap(route => route.data)
      .subscribe((event) => this.currentLink = event['title']);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.urlSub.unsubscribe();
  }

  open(elementRef: ElementRef) {
    this.renderer.setElementClass(elementRef, 'open', true);
    this.renderer.setElementClass(elementRef, 'close', false);
  }

  close(e: Event, elementRef: ElementRef) {
    this.renderer.setElementClass(elementRef, 'open', false);
    this.renderer.setElementClass(elementRef, 'close', true);
  }

  toggleMenue(elementRef: ElementRef) {
    this.isMenueOpen = !this.isMenueOpen;
    this.renderer.setElementClass(elementRef, 'open', this.isMenueOpen);
  }

  showLogin() {
    this.dialogService.openDialog();
  }

  signout() {
    this.userService.removeUserProfileFromLocalStorage();
    this.authService.signout();
  }

}
