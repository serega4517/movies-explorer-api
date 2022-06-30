// 403
const { ERR_CODE_FORBIDDEN } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERR_CODE_FORBIDDEN;
  }
}

module.exports = ForbiddenError;
