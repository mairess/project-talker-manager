const express = require('express');
const validationFields = require('../middlewares/validationFields');
const generateToken = require('../utils/generateToken');

const router = express.Router();
router.use(validationFields);

router.post('/', async (req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

module.exports = router;