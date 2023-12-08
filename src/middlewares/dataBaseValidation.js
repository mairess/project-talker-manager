const talkersDB = require('../db/talkersDB');

const dataBaseValidation = async (req, res, next) => {
  const [result] = await talkersDB.allTalkers();

  if (result.length === 0) {
    return res.status(200).json([]);
  }
  next();
};

module.exports = dataBaseValidation;