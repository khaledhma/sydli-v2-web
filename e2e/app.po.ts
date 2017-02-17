import { browser, element, by } from 'protractor';

export class SydliV2Page {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('sy-root h1')).getText();
  }
}
