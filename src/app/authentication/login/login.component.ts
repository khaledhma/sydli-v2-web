import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/take';


import { AuthenticationService } from '../../authentication.service';
import { DialogService } from '../../dialog.service';

@Component({
  selector: 'sy-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  private showSpinner: boolean = false;
  private errorMessage: string = "";
  private isError: boolean = false;

  constructor(private authService: AuthenticationService, private dialogService: DialogService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  login (form: NgForm) {
    this.showSpinner = true;
    let email = form.value.email;
    let password = form.value.password;
    this.authService.loginUserWithEmailAndPassword (email, password).then(
      (user)=>{
        this.showSpinner = false;
        this.errorMessage = "";
        this.isError = false;
        this.close(form);
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
    this.dialogService.closeDialog();
  }

  reset(form: NgForm) {
    form.onReset();
  }

}
