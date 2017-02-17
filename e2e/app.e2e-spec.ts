import { SydliV2Page } from './app.po';

describe('sydli-v2 App', () => {
  let page: SydliV2Page;

  beforeEach(() => {
    page = new SydliV2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('sy works!');
  });
});
