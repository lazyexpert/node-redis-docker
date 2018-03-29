function validate(client) {
  const expectedMethods = ['read', 'write', 'readRange', 'remove'];

  expectedMethods.forEach(key => {
    if (typeof client[key] !== 'function') {
      throw new Error(`Interface matching failed. Missing ${key} implementation.`);
    }
  });
}

class Storage {
  constructor(client = null) {
    if (client) {
      validate(client);
    }

    this.client = client;
  }

  setClient(client) {
    validate(client);

    this.client = client;
  }

  read(key) {
    return this.client.read(key);
  }

  readRange(conditions) {
    return this.client.readRange(conditions);
  }

  write(key, value) {
    return this.client.write(key, value);
  }

  remove(key) {
    return this.client.remove(key);
  }
}

module.exports = Storage;
