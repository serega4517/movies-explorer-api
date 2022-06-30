// 400
const { ERR_CODE_BAD_REQUEST } = require('../utils/constants');

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERR_CODE_BAD_REQUEST;
  }
}

module.exports = BadRequest;
