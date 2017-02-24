import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class DialogService {

  public opened = new EventEmitter<boolean>();
  constructor() { }

  openDialog() {
    this.opened.emit(true);
  }

  closeDialog() {
    this.opened.emit(false);
  }

}
