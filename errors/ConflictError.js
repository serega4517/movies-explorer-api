// 409
const { ERR_CODE_CONFLICT } = require('../utils/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERR_CODE_CONFLICT;
  }
}

module.exports = ConflictError;
