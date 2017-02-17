import { Injectable, EventEmitter } from '@angular/core';
import { AngularFire, FirebaseAuthState, AuthProviders, AuthMethods } from 'angularfire2';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';

import { User } from './user';
import { UserService } from './user.service';

@Injectable()
export class AuthenticationService {

  public openLogin = new EventEmitter<boolean>();

  constructor(private af: AngularFire, private userService: UserService) { }

  showLogin(value: boolean) {
    this.openLogin.emit(value);
  }

  loginUserWithEmailAndPassword(email: string, password: string): firebase.Promise<FirebaseAuthState> {
    return this.af.auth.login({ 'email': email, 'password': password }, { provider: AuthProviders.Password, method: AuthMethods.Password });
  }

  signupUserWithEmailAndPassword(email: string, password: string): firebase.Promise<FirebaseAuthState> {
    return this.af.auth.createUser({ 'email': email, 'password': password });
  }

  updateProfile(name: string, auth: FirebaseAuthState): firebase.Promise<any> {
    return auth.auth.updateProfile({ 'displayName': name, 'photoURL': '' });
  }

  signout() {
    this.af.auth.logout();
  }

  isAuthenticated(): Observable<boolean> {
    let _user;
    return this.af.auth.mergeMap((user) => {
      _user = user;
      if (!user) {
        return Observable.of(false);
      }
      return this.userService.getUserProfile(user['uid']).take(1).mergeMap((userData) => {
        if (userData.$exists()) {
          // user already created so save to local storage
          this.userService.saveUserProfileToLocalStorage(new User(userData['displayName'], userData['email'], userData['uid'], userData['mode'], undefined, undefined));
          return Observable.of(true);
        } else {
          // No user created so create one then save to local storage
          let newUser = new User(_user.auth.displayName, _user.auth.email, _user.uid, undefined, undefined, undefined);
          return Observable.fromPromise(<Promise<void>>(this.userService.createUser(newUser))).mergeMap(
            () => {
              this.userService.saveUserProfileToLocalStorage(newUser);
              return Observable.of(true);
            })
        }
      })
    })
  }

}
