const fileManipulation = require('../utils/fileManipulation');
const searchTalker = require('../utils/searchTalker');

const dateAndQAdnDateExisting = async (req, res, next) => {
  const { q, date, rate } = req.query;
  const theTalkers = await fileManipulation.getAllTalkers();
  
  if (date && rate && q) {
    const resultsByRate = await searchTalker.byRate(theTalkers, rate);
  
    const resultsFound = resultsByRate
      .filter((result) => result.talk.watchedAt === date)
      .filter((result) => result.name.includes(q));
    return res.status(200).json(resultsFound);
  }
  
  next();
};

module.exports = dateAndQAdnDateExisting;
