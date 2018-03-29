class RemoveMessageRoute {
  constructor(storage) {
    this.method = 'delete';
    this.path = '/messages/:echoAt';

    this.storage = storage;

    this.handler = this.handler.bind(this);
  }

  handler(req, res, next) {
    return this.storage.remove(req.params.echoAt)
      .then(() => {
        console.log(`Removed key: ${req.params.echoAt}`);
        res.end();
      })
      .catch(next);
  }
}

module.exports = RemoveMessageRoute;
