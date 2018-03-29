const config = require('config');
const redis = require('redis');
const redisLock = require('redis-lock');

const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

class RedisClient {
  constructor() {
    this.client = redis.createClient(config.redis.port, config.redis.db);
    this.lock = redisLock(this.client);
  }

  read(key) {
    return this.readRange({
      min: key,
      max: key
    });
  }

  readRange(options) {
    return new Promise(function(resolve, reject) {
      this.lock(config.redis.setKey, function(done) {
        this.client.zrangebyscoreAsync(config.redis.setKey, options.min, options.max)
          .then(data => {
            resolve(data);
            done();
          })
          .catch(err => {
            reject(err);
            done();
          });
      }.bind(this));
    }.bind(this));
  }

  write(key, value) {
    return this.read(key)
      .then(val => {
        val = val.length ? JSON.parse(val) : { key, data: [] };
        val.data.push(value);

        return this.client.zaddAsync(config.redis.setKey, key, JSON.stringify(val));
      })
      .catch(err => {
        throw err;
      });
  }

  remove(key) {
    return new Promise(function(resolve, reject) {
      this.lock(config.redis.setKey, function(done) {
        this.client.zremrangebyscore(config.redis.setKey, key, key, function(err, reply) {
          done();

          return err ? reject(err) : resolve(reply);
        });
      }.bind(this));
    }.bind(this));
  }
}

module.exports = RedisClient;
