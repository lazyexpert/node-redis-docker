function validate(renderer) {
  if (typeof renderer.render !== 'function') {
    throw new Error('Interface matching failed');
  }
}

class OutputProducer {
  constructor(renderer = null) {
    if (renderer) {
      validate(renderer);
    }

    this.renderer = renderer;

    this.render = this.render.bind(this);
  }

  setRenderer(renderer) {
    validate(renderer);

    this.renderer = renderer;
  }

  render(message) {
    this.renderer.render(message);
  }
}

module.exports = OutputProducer;
