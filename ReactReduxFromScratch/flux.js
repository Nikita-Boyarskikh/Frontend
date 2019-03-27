export const __INIT__ = '__INIT__';

export function combineReducers(reducersObj) {
  return function reducer(state={}, action) {
    return Object.keys(reducersObj)
      .reduce((finalState, key) => ({
        ...finalState,
        [key]: reducersObj[key](state[key], action)
      }), {});
  };
}

export function createAction(type, payload = {}, meta = {}) {
  const error = payload instanceof Error;
  return { type, payload, meta, error };
}

export class Store extends Object {
  constructor(reducer, initialState, middlewares=[]) {
    super(arguments);

    this.reducer = reducer;
    this.state = initialState;
    this.middlewares = middlewares;
    this.listeners = [];

    this.dispatch(createAction(__INIT__));
  }

  subscribe(listener) {
    if (!this.listeners.includes(listener)) {
      this.listeners.push(listener);
    }
  }

  getState() {
    return this.state;
  }

  dispatch(action) {
    this.middlewares.forEach(middleware => middleware(this.getState, action, this.dispatch));
    this.state = this.reducer(this.getState(), action);
    this.listeners.forEach(listener => listener());
  }
}
