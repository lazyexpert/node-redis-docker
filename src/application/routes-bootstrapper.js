class RouteBootstrapper {
  constructor(app, routes) {
    this.app = app;
    this.routes = routes;
  }

  init() {
    this.routes.forEach(route => {
      this.app[route.method](route.path, route.handler);
    });
  }
}

module.exports = RouteBootstrapper;
