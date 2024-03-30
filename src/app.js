const express = require('express');
const swaggerUI = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const cors = require('cors');
const talkersDB = require('./db/talkersDB');
const fileManipulation = require('./utils/fileManipulation');
const loginRouter = require('./routes/loginRouter');
const { auth } = require('./middlewares/auth');
const talkerValidation = require('./middlewares/talkerValidation');
const {
  nameValidation,
  ageValidation,
  talkValidation,
} = require('./middlewares/validation');
const {
  notStandardDate,
  notStandardRate,
  notExistingParams,
  rateAndQExisting,
  onlyQExisting,
  onlyRateExisting,
  onlyDateExisting,
  dateAndQExisting,
  dateAndRateExisting,
} = require('./middlewares/queryParamsValidation');
const dateAndQAdnDateExisting = require('./middlewares/dateAndQAdnDateExisting');
const rateFromBodyValidation = require('./middlewares/rateFromBodyValidation');
const dataBaseValidation = require('./middlewares/dataBaseValidation');

const raw = fs.readFileSync('swagger.yaml');
const data = yaml.load(raw);

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(data));

app.use('/login', loginRouter);

app.get('/talker/search',
  notExistingParams,
  dateAndQAdnDateExisting,
  notStandardRate,
  rateAndQExisting,
  dateAndQExisting,
  dateAndRateExisting,
  auth,
  onlyQExisting,
  onlyRateExisting,
  notStandardDate,
  onlyDateExisting);

app.get('/talker', async (req, res, next) => {
  try {
    const theTalkers = await fileManipulation.getAllTalkers();
    if (theTalkers.length) return res.status(200).json(theTalkers);
    return res.status(200).json([]);
  } catch (error) {
    return next(error);
  }
});

app.get('/talker/db', dataBaseValidation, async (req, res, next) => {
  try {
    const [result] = await talkersDB.allTalkers();
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
});

app.get('/talker/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const theTalkers = await fileManipulation.getAllTalkers();
    const theTalker = theTalkers.find((talker) => talker.id === Number(id));

    if (theTalker) return res.status(200).json(theTalker);

    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (error) {
    return next(error);
  }
});

app.use(auth);

app.post('/talker', nameValidation, ageValidation, talkValidation, async (req, res, next) => {
  try {
    const newTalker = req.body;
    const addedTalker = await fileManipulation.addNewTalker(newTalker);
    await fileManipulation.getAllTalkers();

    res.status(201).json(addedTalker);
  } catch (error) {
    return next(error);
  }
});

app.put('/talker/:id', nameValidation, ageValidation, talkValidation, talkerValidation,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedTalker = await fileManipulation.updateTalker(String(id), req.body);
      res.status(200).json(updatedTalker);
    } catch (error) {
      return next(error);
    }
  });

app.delete('/talker/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await fileManipulation.deleteTalker(Number(id));
    res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

app.patch('/talker/rate/:id', rateFromBodyValidation, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rate } = req.body;
    await fileManipulation.updateRate(id, rate);
    res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

app.use((error, _req, res, _next) => res.status(500).json({ error: error.message }));

module.exports = app;