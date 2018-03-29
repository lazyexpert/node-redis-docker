function attachNotFoundHandler(app) {
  app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;

    return next(err);
  });
}

function attachServerErrorHandler(app) {
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    console.error(err);

    res.send({
      message: err.message,
      error: err
    });
  });
}

class ErrorHandler {
  constructor(app) {
    this.app = app;
  }

  init() {
    attachNotFoundHandler(this.app);
    attachServerErrorHandler(this.app);
  }
}

module.exports = ErrorHandler;
