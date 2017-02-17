import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(): Observable<boolean> | boolean {
    this.authService.isAuthenticated().subscribe(
      (isLogged)=> {
        if(!isLogged) {
          this.router.navigate(['']);
        }
      },
      (error)=>{
        this.router.navigate(['']);
      }
    )
    return this.authService.isAuthenticated();
  }

}
