import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sy-offline-indicator',
  templateUrl: './offline-indicator.component.html',
  styleUrls: ['./offline-indicator.component.scss']
})
export class OfflineIndicatorComponent implements OnInit {

  @Input() show: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

}
