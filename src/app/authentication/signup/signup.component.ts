import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthenticationService } from '../../authentication.service';


@Component({
  selector: 'sy-signup',
  templateUrl: './signup.component.html',
  styles: []
})
export class SignupComponent implements OnInit {

  private showSpinner: boolean = false;
  private errorMessage: string = "";
  private isError: boolean = false;
  @Output() switchPanel = new EventEmitter<any>();


  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  signup(form: NgForm) {
    this.showSpinner = true;
    let name = form.value.name;
    let email = form.value.email;
    let password = form.value.password;
    this.authService.signupUserWithEmailAndPassword (email, password).then(
      (user)=>{
        this.authService.updateProfile(name,user).then();
        this.showSpinner = false;
        this.errorMessage = "";
        this.isError = false;
        this.authService.signout();
        this.switchPanel.emit();
      }
    ).catch(
      (error)=>{
        this.showSpinner = false;
        this.errorMessage = error.message;
        this.isError = true;
      }
    )
  }

  close(form: NgForm) {
    this.showSpinner = false;
    this.errorMessage = "";
    this.isError = false;
    this.reset(form);
  }

  reset(form: NgForm) {
    form.onReset();
  }

}
