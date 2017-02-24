import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LangService {

  public langSelected = new EventEmitter<string>();
  constructor() { }

  changeLang (lang: string) {
    this.langSelected.emit(lang);
  }

}
