// 401
const { ERR_CODE_UNAUTHORIZED } = require('../utils/constants');

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERR_CODE_UNAUTHORIZED;
  }
}

module.exports = AuthorizationError;
