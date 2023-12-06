const express = require('express');
const fileManipulation = require('./utils/fileManipulation');
const loginRouter = require('./routes/loginRouter');
const { auth } = require('./middlewares/auth');
const { nameValidation, ageValidation,
  talkValidation } = require('./middlewares/validation');
const talkerValidation = require('./middlewares/talkerValidation');

const app = express();

app.use(express.json());
app.use('/login', loginRouter);

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
app.use(nameValidation);
app.use(ageValidation);
app.use(talkValidation);

app.post('/talker', async (req, res) => {
  const newTalker = req.body;
  const addedTalker = await fileManipulation.addNewTalker(newTalker);
  await fileManipulation.getAllTalkers();

  res.status(201).json(addedTalker);
});

app.put('/talker/:id', talkerValidation, async (req, res) => {
  const { id } = req.params;
  const updatedTalker = await fileManipulation.updateTalker(String(id), req.body);
  res.status(200).json(updatedTalker);
});

module.exports = app;