const express = require('express');
const readTheFile = require('./utils/readTheFile');

const app = express();

app.use(express.json());

app.get('/talker', async (req, res) => {
  const theTalkers = await readTheFile();

  if (theTalkers.length) return res.status(200).json(theTalkers);

  return res.status(200).json([]);
});

module.exports = app;