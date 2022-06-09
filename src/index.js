const { SERVER_CONFIG } = require('./config');
const FHIRServer = require('./lib/server');

// load environment settings
require('./environment');

// Start buliding our server
const server = new FHIRServer(SERVER_CONFIG)
  .initializeDatabaseConnection()
  .configureMiddleware()
  .configurePassport()
  .configureHelmet()
  .enableHealthCheck()
  .setProfileRoutes()
  .setErrorRoutes();

server.listen(SERVER_CONFIG.port);
server.logger.info(`FHIR Server listening on localhost:${SERVER_CONFIG.port}`);
