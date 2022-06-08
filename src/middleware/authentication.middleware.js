const passport = require('passport');
const noopMiddleware = require('./noop.middleware');

/**
 * @name exports
 * @summary Middleware function for authentication
 */
module.exports = function authenticationMiddleware(server) {
  const auth = (server && server.config && server.config.auth) || {};
  const env = server && server.env;

  return env && env.AUTHENTICATION
    ? passport.authenticate(auth.name, auth.passportOptions)
    : noopMiddleware;
};
