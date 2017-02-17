import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sy-make-order',
  templateUrl: './make-order.component.html',
  styles: []
})
export class MakeOrderComponent implements OnInit {
  private uploadedImageUrl: string = "";

  constructor() { }

  ngOnInit() {
  }

}
