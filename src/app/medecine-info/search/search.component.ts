import { Component, OnInit, Output, EventEmitter, ElementRef, Renderer } from '@angular/core';
import { MedecineService } from '../../medecine.service';


@Component({
  selector: 'sy-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  private medecineList: any[] = [];
  private showSpinner: boolean = false;
  private placeholderString: string = 'Enter Medecine Name';
  private searchMode = 1;
  private lang = 0;

  @Output() medecineSelected = new EventEmitter();

  constructor(private medecineService: MedecineService, private renderer: Renderer) { }

  public search(name: string) {
    if (name !== "") {


      if (name.charCodeAt(0) >= 1536 && name.charCodeAt(0)<= 1791){
        this.lang = 1;
      } else {
        this.lang = 0;
      }


      this.showSpinner = true;
      this.medecineList = [];

      const medecinSearch$ = this.medecineService.getMedecineNames(name, this.searchMode, this.lang).subscribe(
        (data) => {
          this.medecineList = data;
          this.showSpinner = false;
        },
        (error) => {
          this.showSpinner = false;
        }
      )

    } else {
      this.showSpinner = false;
      this.medecineList = [];
    }
  }


  showDetails(medecineId) {
    this.medecineSelected.emit(medecineId);
  }

  selectionChanged(modeId: number, el: ElementRef) {
    this.medecineList = [];
    this.resetSearch(el);
    if (modeId === 1) {
      this.placeholderString = 'Enter Medecine Name';
      this.searchMode = 1;
    }
    if (modeId === 2) {
      this.placeholderString = 'Enter Medecine BarCode';
      this.searchMode = 2;
    }
    if (modeId === 3) {
      this.placeholderString = 'Enter Medecine Effective Substance';
      this.searchMode = 3;
    }
  }

  resetSearch(el: ElementRef) {
    this.renderer.setElementProperty(el, 'value', '');
  }


  ngOnInit() { }



}
