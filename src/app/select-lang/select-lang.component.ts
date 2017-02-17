import { Component, OnInit } from '@angular/core';
import {TranslateService} from 'ng2-translate';

@Component({
  selector: 'sy-select-lang',
  templateUrl: './select-lang.component.html',
  styleUrls: ['./select-lang.component.scss']
})
export class SelectLangComponent implements OnInit {

  private currentLang: string;
  private otherLang: string;
  private displayLangName: string;

  constructor(private translate: TranslateService) {

    translate.addLangs(["en", "ar"]);
    translate.setDefaultLang('en');

    let browserLang = navigator.language;
    if(browserLang.startsWith("en")) {
      translate.use("en");
      this.currentLang = "en";
      this.otherLang = "ar";
      this.displayLangName = "عربى";
    }

    if (browserLang.startsWith("ar")) {
      translate.use("ar");
      this.currentLang = "ar";
      this.otherLang = "en";
      this.displayLangName = "English";
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
    } else {
      this.translate.use("en");
      this.currentLang = "en";
      this.otherLang = "ar";
      this.displayLangName = "عربى";
    }
  }

}
