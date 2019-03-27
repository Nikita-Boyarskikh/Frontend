export default class Component {
  constructor(selector, props={}) {
    this.selector = selector;
    this.props = props;
  }

  template(props) {
    throw new Error('You must override this method');
  }

  render(selector=null) {
    this.$el = document.querySelector(selector || this.selector);
    this.$el.innerHTML = this.template(this.props);
  }
}
