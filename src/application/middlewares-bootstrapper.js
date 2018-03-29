const bodyParser = require('body-parser');

function attachEchoHttpMiddleware(app) {
  app.use(function(req, res, next) {
    console.log(`HTTP. URL: ${req.url}, method: ${req.method}`);
    next();
  });
}

function attachBodyParser(app) {
  app.use(bodyParser.json());
}

class MiddlewaresBootstrapper {
  constructor(app) {
    this.app = app;
  }

  init() {
    attachBodyParser(this.app);
    attachEchoHttpMiddleware(this.app);
  }
}

module.exports = MiddlewaresBootstrapper;
