export function subscribeViews(store, pages) {
  Object.values(pages).forEach(({ component }) => store.subscribe(() => {
    component.render();
  }));
}
