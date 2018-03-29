class MessagePopJob {
  constructor(storage, outputProducer) {
    this.storage = storage;
    this.outputProducer = outputProducer;
  }

  exec() {
    console.log('Executing message-pop job.');
    this.storage.readRange({
      min: 0,
      max: Date.now()
    }).then(entries => {
      entries.forEach(entry => {
        try {
          const parsed = JSON.parse(entry);
          parsed.data.forEach(this.outputProducer.render);
          this.storage.remove(parsed.key);
        } catch(e) {
          console.error(e);
        }
      });
    }).catch(err => console.error(err));
  }
}

module.exports = MessagePopJob;
