const config = require('config');

function getTickFunction(jobs) {
  return function() {
    console.log(':: :: :: :: Heartbeat :: :: :: :: start jobs processing :: :: :: ::');
    jobs.forEach(job => job.exec());
  };
}

class HeartBeatService {
  constructor(jobs = []) {
    this.jobs = jobs;
  }

  init() {
    const tickFn = getTickFunction(this.jobs);

    setInterval(tickFn, config.app.heartbeat);
  }

  addJob(job) {
    this.jobs.push(job);
  }
}

module.exports = HeartBeatService;
