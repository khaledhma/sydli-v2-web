import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/take';

import { User } from './user';
import { Address } from './address';

@Injectable()
export class UserService {

  constructor(private af:AngularFire) { }

  createUser(user: User): firebase.Promise<void> {
    let userNode = {[user['uid']]:user};
    return this.af.database.object('/users').update(userNode);
  }

  getUserProfile(uid: string): FirebaseObjectObservable<any> {
    return this.af.database.object('/users/'+uid);
  }

  saveUserProfileToLocalStorage(user: User) {
    localStorage.setItem('userProfile',JSON.stringify(user));
  }

  getUserProfileFromLocalStorage(): User {
    try {
      return localStorage.getItem('userProfile')?JSON.parse(localStorage.getItem('userProfile')):null;
    } catch(error) {
      console.log('return error: ', error);
      return null;
    }
  }

  removeUserProfileFromLocalStorage() {
    localStorage.getItem('userProfile')?localStorage.removeItem('userProfile'):1;
  }

  addAddress(uid: string, address: Address): firebase.Promise<void> {
    return this.af.database.list('/users/'+uid+'/addresses').push(address);
  }

  deleteAddress(uid: string, addressKey: string): firebase.Promise<void> {
    return this.af.database.list('/users/'+uid+'/addresses').remove(addressKey);
  }

}
