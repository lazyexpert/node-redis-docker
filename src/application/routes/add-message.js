const tv4 = require('tv4');

const schema = {
  type: 'object',
  properties: {
    message: 'string',
    echoAt: 'number'
  },
  required: ['message', 'echoAt']
};

function validationErrorFactory() {
  const error = new Error('Bad request');
  error.status = 400;

  return error;
}

class AddMessageRoute {
  constructor(storage) {
    this.method = 'post';
    this.path = '/messages';

    this.storage = storage;

    this.handler = this.handler.bind(this);
  }

  handler(req, res, next) {
    if (!tv4.validate(req.body, schema)) {
      return next(validationErrorFactory());
    }

    return this.storage.write(req.body.echoAt, req.body.message)
      .then(() => {
        console.log(`Inserted new delayed message. EchoAt: ${req.body.echoAt}, message: ${req.body.message}`);
        res.end();
      })
      .catch(next);
  }
}

module.exports = AddMessageRoute;
