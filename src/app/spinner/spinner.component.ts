import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'sy-spinner',
  templateUrl: './spinner.component.html',
  styles: []
})
export class SpinnerComponent implements OnInit {

  @Input('color') color: string = 'accent';
  @Input('size') size: string = 'sm';
  @Input('show') show: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
