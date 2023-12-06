const emailValidation = (req, res, next) => {
  const { email } = req.body;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

  if (!isEmailValid) {
    return res.status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
  }

  next();
};

module.exports = {
  emailValidation,
};