const passwordValidation = (req, res, next) => {
  const { password } = req.body;
  
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  
  const isPasswordValid = password.length >= 6;

  if (!isPasswordValid) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres' }); 
  }
  
  next();
};
  
module.exports = {
  passwordValidation,
};