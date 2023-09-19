const validationMiddleware = require('./validation.middlewares');
const errorFilter = require('./errorFilter.middleware');
const authorizeMiddleware = require('./authorize.middleware');
const passport = require('./passport.middleware');

module.exports = {
  validationMiddleware,
  errorFilter,
  authorizeMiddleware,
  passport,
};
