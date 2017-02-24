import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sy-backdrop',
  templateUrl: './backdrop.component.html',
  styles: []
})
export class BackdropComponent implements OnInit {

  @Input() private showBackDrop: boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
