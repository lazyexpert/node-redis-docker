module.exports = {
  app: {
    heartbeat: 1000,
    port: 3000
  },
  redis: {
    db: 'redis',
    setKey: 'messages',
    port: 6379
  }
};
