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

const onlyRateExisting = async (req, res, next) => {
  const { rate } = req.query;
  const theTalkers = await fileManipulation.getAllTalkers();

  if (rate) {
    const foundedResults = await searchTalker.byRate(theTalkers, rate);
    return res.status(200).json(foundedResults);
  }

  next();
};

const notStandarRate = (req, res, next) => {
  const { rate } = req.query;

  if (rate !== undefined) {
    const rateNumber = Number(rate);
    if (!Number.isInteger(rateNumber) || rateNumber < 1 || rateNumber > 5) {
      return res.status(400).json({
        message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
      });
    }
  }
  
  next();
};
  
module.exports = {
  notExisting,
  rateAndQExisting,
  onlyQExisting,
  onlyRateExisting,
  notStandarRate,
};