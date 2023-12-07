const fileManipulation = require('../utils/fileManipulation');
const searchTalker = require('../utils/searchTalker');

const notExisting = async (req, res, next) => {
  const { q, rate } = req.query;
  const theTalkers = await fileManipulation.getAllTalkers();
  
  if (!q && !rate) {
    return res.status(200).json(theTalkers);
  }
  next();
};

const rateAndQExisting = async (req, res, next) => {
  const { q, rate } = req.query;
  const theTalkers = await fileManipulation.getAllTalkers();

  if (q && rate) {
    const resultsByName = await searchTalker.byName(theTalkers, q);
    const resultsByrate = await searchTalker.byRate(theTalkers, rate);
    const foundResults = resultsByName.filter((result) => resultsByrate.includes(result));
    return res.status(200).json(foundResults);
  }

  next();
};

const onlyQExisting = async (req, res, next) => {
  const { q } = req.query;
  const theTalkers = await fileManipulation.getAllTalkers();

  if (q) {
    const foundedResults = await searchTalker.byName(theTalkers, q);
    return res.status(200).json(foundedResults);
  }

  next();
};
  
module.exports = {
  notExisting,
  rateAndQExisting,
  onlyQExisting,
};