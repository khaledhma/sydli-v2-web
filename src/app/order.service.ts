import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Order } from './order';

@Injectable()
export class OrderService {

  constructor(private af: AngularFire) { }

  sendOrder(order: Order): firebase.Promise<void> {
    return this.af.database.list('/orders').push(order);
  }

  getOrdersOfUser(uid: string): FirebaseListObservable<any> {
    return this.af.database.list('/orders', {
      query: {
        orderByChild: 'orderSenderId',
        equalTo: uid,
        limitToLast: 10
      }
    });
  }

  getOrdersOfPharmacy(name: string): FirebaseListObservable<any> {
    return this.af.database.list('/orders', {
      query: {
        orderByChild: 'orderAcceptedBy',
        equalTo: name,
        limitToLast: 10
      }
    });
  }

  getPendingOrders(): FirebaseListObservable<any> {
    return this.af.database.list('/orders', {
      query: {
        orderByChild: 'orderStatus',
        equalTo: 'pending',
        limitToLast: 10
      }
    });
  }

  acceptOrder(orderId: string, accebtedBy: string): firebase.Promise<void> {
    return this.af.database.object('/orders/'+ orderId).update({'orderStatus':'accepted', 'orderAcceptedBy':accebtedBy});
  }

}
