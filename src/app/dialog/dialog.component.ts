import { Component, OnInit } from '@angular/core';

import { DialogService } from '../dialog.service';

@Component({
  selector: 'sy-dialog',
  templateUrl: './dialog.component.html',
  styles: []
})
export class DialogComponent implements OnInit {

  private show: boolean = false;

  constructor(private dialogService: DialogService) { }

  ngOnInit() {
    this.dialogService.opened.subscribe((value) => {
      this.show = value;
    })
  }

  close() {
    this.dialogService.closeDialog();
  }

}
