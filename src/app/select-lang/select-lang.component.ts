import { Component, OnInit } from '@angular/core';
import {TranslateService} from 'ng2-translate';

import { LangService } from '../lang.service';


@Component({
  selector: 'sy-select-lang',
  templateUrl: './select-lang.component.html',
  styles: []
})
export class SelectLangComponent implements OnInit {

  private currentLang: string;
  private otherLang: string;
  private displayLangName: string;

  constructor(private translate: TranslateService, private langService: LangService) {

    translate.addLangs(["en", "ar"]);
    translate.setDefaultLang('en');

    let browserLang = navigator.language;
    if(browserLang.startsWith("en")) {
      translate.use("en");
      this.currentLang = "en";
      this.otherLang = "ar";
      this.displayLangName = "عربى";
      this.langService.changeLang("en");
    }

    if (browserLang.startsWith("ar")) {
      translate.use("ar");
      this.currentLang = "ar";
      this.otherLang = "en";
      this.displayLangName = "English";
      this.langService.changeLang("ar");
    }

  }

  ngOnInit() {
  }

  changeLang() {
    console.log(this.currentLang);
    if (this.currentLang == "en") {
      this.translate.use("ar");
      this.currentLang = "ar";
      this.otherLang = "en";
      this.displayLangName = "English";
      this.langService.changeLang("ar");
    } else {
      this.translate.use("en");
      this.currentLang = "en";
      this.otherLang = "ar";
      this.displayLangName = "عربى";
      this.langService.changeLang("en");
    }
  }

}
