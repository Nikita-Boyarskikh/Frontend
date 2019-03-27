import PageNotFound from 'src';

export default class Router {
  constructor({pages, currentPage = '/', pageContainerSelector = 'body'}) {
    this.pages = pages;
    this.currentPage = currentPage;
    this.selector = pageContainerSelector;
  }

  handleAnchors() {
    const anchors = document.querySelector(this.selector).querySelectorAll('a');
    [...anchors].forEach(anchor => {
      anchor.onclick = event => {
        event.preventDefault();
        this.navigate(event.target.href);
        return false;
      }
    });
  }

  route() {
    this.navigate(location.href, false);
    this.handleAnchors();

    window.onpopstate = (event) => {
      event.preventDefault();
      this.navigate(location.href, false);
      this.handleAnchors();
      return false;
    };
  }

  static extractPath(url) {
    let path = null;

    try {
      path = new URL(url);
    } catch {
      path = new URL(location.origin + url);
    }

    return path;
  }

  navigate(url, writeHistory=true) {
    const params = Router.extractPath(url);
    if (params.pathname === this.currentPage) {
      return;
    }

    this.currentPage = params.pathname;
    const route = this.pages[this.currentPage];
    const { component=new PageNotFound(this.selector), title='Page not found' } = route || {};

    const updateHistory = writeHistory ? history.pushState : history.replaceState;
    updateHistory.apply(history, [null, title, url]);
    return component.render(this.selector);
  }
}
