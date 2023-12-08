const express = require('express');
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
} = require('./middlewares/queryParamsValidation.js');

const app = express();

app.use(express.json());
app.use('/login', loginRouter);

app.get('/talker/search',
  notStandardRate,
  notExistingParams,
  rateAndQExisting,
  auth,
  onlyQExisting,
  onlyRateExisting,
  onlyDateExisting,
  notStandardDate);

app.get('/talker', async (req, res) => {
  const theTalkers = await fileManipulation.getAllTalkers();
  if (theTalkers.length) return res.status(200).json(theTalkers);
  return res.status(200).json([]);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const theTalkers = await fileManipulation.getAllTalkers();
  const theTalker = theTalkers.find((talker) => talker.id === Number(id));

  if (theTalker) return res.status(200).json(theTalker);
  
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.use(auth);

app.post('/talker', nameValidation, ageValidation, talkValidation, async (req, res) => {
  const newTalker = req.body;
  const addedTalker = await fileManipulation.addNewTalker(newTalker);
  await fileManipulation.getAllTalkers();

  res.status(201).json(addedTalker);
});

app.put('/talker/:id', nameValidation, ageValidation, talkValidation, talkerValidation,
  async (req, res) => {
    const { id } = req.params;
    const updatedTalker = await fileManipulation.updateTalker(String(id), req.body);
    res.status(200).json(updatedTalker);
  });

app.delete('/talker/:id', async (req, res) => {
  const { id } = req.params;
  await fileManipulation.deleteTalker(Number(id));
  res.status(204).send();
});

module.exports = app;