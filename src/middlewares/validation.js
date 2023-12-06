const rateValidation = require('./rateValidation');
const watchedAtValidation = require('./watchedAtValidation');

const nameValidation = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const ageValidation = (req, res, next) => {
  const { age } = req.body;
  
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  
  if (Number.isNaN(age) || !Number.isInteger(age) || age < 18) {
    return res.status(400).json({
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  }
  next();
};

const talkValidation = (req, res, next) => {
  const { talk } = req.body;
    
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }

  watchedAtValidation(req, res, () => {
    rateValidation(req, res, next);
  });
};
    
module.exports = {
  nameValidation,
  ageValidation,
  talkValidation,
};