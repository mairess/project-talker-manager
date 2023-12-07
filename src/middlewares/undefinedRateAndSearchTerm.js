const fileManipulation = require('../utils/fileManipulation');

const undefinedRateAndSearchTerm = async (req, res, next) => {
  const theTalkers = await fileManipulation.getAllTalkers();
  const { q, rate } = req.query;
  
  if (!q && !rate) {
    return res.status(200).json(theTalkers);
  }
  next();
};
  
module.exports = undefinedRateAndSearchTerm;