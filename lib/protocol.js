const config = require('../config');
const validateProtocol = config.validateProtocol;
const validate = require('./validate');

module.exports.encode = (event, callback) => {
  return (payload) => {
    callback(JSON.stringify({
      type: event,
      payload: payload
    }));
  };
};

module.exports.decode = validateProtocol
  ?
    (callback) => {
      return (data) => {
        const validatedData = validate(data);
        if (validatedData.ok) {
          callback(validatedData.data);
        }
      };
    }
  :
    (CRUD) => {
      return (data) => {
        const message = JSON.parse(data);

        CRUD[message.type](message.payload);
      };
    };
