const express = require('express');
const config = require('config');

// Routes
const { AddMessageRoute, RemoveMessageRoute } = require('./routes');

// Services
const RedisClient = require('./services/redis-client');
const Storage = require('./services/storage');
const HeartbeatService = require('./services/heartbeat');
const OutputProducerService = require('./services/output-producer');

// Jobs
const MessagePopJob = require('./services/message-pop.job');

// Bootstrappers
const MiddlewaresBootstrapper = require('./middlewares-bootstrapper');
const RouteBootstrapper = require('./routes-bootstrapper');
const ErrorHandler = require('./error-handler');

// Instances
const redisClient = new RedisClient();
const storage = new Storage(redisClient);

const addMessageRoute = new AddMessageRoute(storage);
const removeMessageRoute = new RemoveMessageRoute(storage);

const routes = [addMessageRoute, removeMessageRoute];

const outputProducerService = new OutputProducerService({ render: console.log });
const messagePopJob = new MessagePopJob(storage, outputProducerService);

class Application {
  constructor() {
    this.app = express();

    this.hearbeatService = new HeartbeatService([messagePopJob]);
    this.middlewaresBootstrapper = new MiddlewaresBootstrapper(this.app);
    this.routeBootstrapper = new RouteBootstrapper(this.app, routes);
    this.errorHandler = new ErrorHandler(this.app);
  }

  start() {
    this.middlewaresBootstrapper.init();
    this.routeBootstrapper.init();
    this.errorHandler.init();

    this.app.listen(config.app.port, function() {
      console.log(`App started at port ${config.app.port}`);
    });

    this.hearbeatService.init();
  }
}

module.exports = Application;
