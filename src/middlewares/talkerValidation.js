const findTheTalker = require('../utils/findTheTalker');

const talkerValidation = async (req, res, next) => {
  const { id } = req.params;
  
  const theTalker = await findTheTalker(id);

  if (!theTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  next();
};
  
module.exports = talkerValidation;