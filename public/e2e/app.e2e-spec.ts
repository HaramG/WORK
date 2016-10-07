import { MsPage } from './app.po';

describe('ms App', function() {
  let page: MsPage;

  beforeEach(() => {
    page = new MsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
