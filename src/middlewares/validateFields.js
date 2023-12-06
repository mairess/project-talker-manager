const validateFields = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: 'Campos ausentes!' });
  }

  next();
};

module.exports = {
  validateFields,
};