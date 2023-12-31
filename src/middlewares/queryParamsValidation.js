const fileManipulation = require('../utils/fileManipulation');
const searchTalker = require('../utils/searchTalker');

const notExistingParams = async (req, res, next) => {
  const { q, rate, date } = req.query;
  const theTalkers = await fileManipulation.getAllTalkers();
  
  if (!q && !rate && !date) {
    return res.status(200).json(theTalkers);
  }
  next();
};

const rateAndQExisting = async (req, res, next) => {
  const { q, rate } = req.query;
  const theTalkers = await fileManipulation.getAllTalkers();

  if (q && rate) {
    const resultsByName = await searchTalker.byName(theTalkers, q);

    const resultsFound = resultsByName
      .filter((result) => result.talk.rate === Number(rate));
    return res.status(200).json(resultsFound);
  }

  next();
};

const dateAndQExisting = async (req, res, next) => {
  const { q, date } = req.query;
  const theTalkers = await fileManipulation.getAllTalkers();

  if (q && date) {
    const dateFormat = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!dateFormat.test(date)) {
      return res.status(400)
        .json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
    }
    const resultsByDate = theTalkers.filter((result) => result.talk.watchedAt === date);
    const resultsByName = await searchTalker.byName(resultsByDate, q);
    return res.status(200).json(resultsByName);
  }

  next();
};

const dateAndRateExisting = async (req, res, next) => {
  const { date, rate } = req.query;
  const theTalkers = await fileManipulation.getAllTalkers();

  if (rate && date) {
    const resultsByDate = await searchTalker.byDate(theTalkers, date);

    const resultsFound = resultsByDate
      .filter((result) => result.talk.rate === Number(rate));
    return res.status(200).json(resultsFound);
  }

  next();
};

const onlyQExisting = async (req, res, next) => {
  const { q } = req.query;
  const theTalkers = await fileManipulation.getAllTalkers();

  if (q) {
    const resultsFound = await searchTalker.byName(theTalkers, q);
    return res.status(200).json(resultsFound);
  }

  next();
};

const onlyRateExisting = async (req, res, next) => {
  const { rate } = req.query;
  const theTalkers = await fileManipulation.getAllTalkers();

  if (rate) {
    const resultsFound = await searchTalker.byRate(theTalkers, rate);
    return res.status(200).json(resultsFound);
  }

  next();
};

const onlyDateExisting = async (req, res, next) => {
  const { date } = req.query;
  const theTalkers = await fileManipulation.getAllTalkers();

  if (date) {
    const resultsFound = await searchTalker.byDate(theTalkers, date);
    return res.status(200).json(resultsFound);
  }

  next();
};

const notStandardRate = (req, res, next) => {
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

const notStandardDate = (req, res, next) => {
  const { date } = req.query;
  const dateFormat = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

  if (!dateFormat.test(date)) {
    return res.status(400).json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
  }
  
  next();
};
  
module.exports = {
  notExistingParams,
  rateAndQExisting,
  onlyQExisting,
  onlyRateExisting,
  onlyDateExisting,
  notStandardRate,
  notStandardDate,
  dateAndQExisting,
  dateAndRateExisting,
};