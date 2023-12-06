const dateFormat = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

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

const theTalkerValidation = (req, res, next) => {
  const { talk } = req.body;
    
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }

  const { watchedAt, rate } = talk;

  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  if (!dateFormat.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};
    
module.exports = {
  nameValidation,
  ageValidation,
  theTalkerValidation,
};