const queryParamsValidation = (req, res, next) => {
  const { rate } = req.query;

  if (rate !== undefined) {
    const rateNumber = Number(rate);
    if (!Number.isInteger(rateNumber) || rateNumber < 1 || rateNumber > 5) {
      return res.status(400).json({
        message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
      });
    }
  }
  console.log('queryParamsValidation passed');
  next();
};

module.exports = queryParamsValidation;