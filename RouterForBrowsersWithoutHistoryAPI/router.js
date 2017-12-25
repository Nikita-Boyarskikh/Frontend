'use strict';

const Router = function () {
  this.history = [];
  this.loader = null;
  this.application = null;
  const root_path = '/root.html';

  function errorHTML (description, reason) {
    reason = reason || '';
    if (reason) {
      reason = ` (${reason})`
    }
    return `<h1 class="error">${description + reason}</h1>`
  }

  function getHashFromUrl (url) {
    return url.split('#').slice(1).join('');
  }

  function init() {
    this.application = document.getElementById('content');
    this.loader = document.getElementById('loading');
    this.route(getHashFromUrl(location.hash));
  }

  function route (path) {
    // Change default root
    if (!path || path === '/') {
      path = root_path;
    }

    fetch(path).then(resp => {
      if (resp.ok) {
        return resp.text();
      } else {
        return errorHTML(resp.statusText, resp.status);
      }
    }).then(html => {
      this._setSectionHtml(html)
    }).catch(e => {
      this._setSectionHtml(errorHTML(e));
    });
  }

  function setSectionHtml (html) {
    this.application.innerHTML = html;
    this.loader.classList.add('hidden');
  }

  function popstate () {
    const hash = getHashFromUrl(location.hash)
    this.route(hash);
    this.history.push(hash);
  }

  this._setSectionHtml = setSectionHtml;
  this.init = init;
  this.route = route;
  this.popstate = popstate;
};