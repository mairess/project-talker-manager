const express = require('express');
const readTheFile = require('./utils/readTheFile');
const loginRouter = require('./routes/loginRouter');
const { auth } = require('./middlewares/auth');
const { nameValidation, ageValidation,
  theTalkerValidation } = require('./middlewares/talkerValidation');

const app = express();

app.use(express.json());
app.use('/login', loginRouter);

app.get('/talker', async (req, res) => {
  const theTalkers = await readTheFile.getAllTalkers();
  if (theTalkers.length) return res.status(200).json(theTalkers);
  return res.status(200).json([]);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const theTalkers = await readTheFile.getAllTalkers();
  const theTalker = theTalkers.find((talker) => talker.id === Number(id));

  if (theTalker) return res.status(200).json(theTalker);
  
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/talker', auth, nameValidation, ageValidation, theTalkerValidation, (req, res) => {
  res.status(201).json({ message: 'Atividade cadastrada com sucesso!' });
});

module.exports = app;