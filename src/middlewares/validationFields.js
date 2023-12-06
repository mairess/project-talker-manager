const { emailValidation } = require('./emailValidation');
const { passwordValidation } = require('./passwordValidation');

const validationFields = (req, res, next) => {
  emailValidation(req, res, () => {
    passwordValidation(req, res, next);
  });
};

module.exports = validationFields;