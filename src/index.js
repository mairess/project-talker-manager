const app = require('./app');
const connection = require('./db/connection');

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, async () => {
  console.log('Online');
  const [result] = await connection.execute('SELECT * FROM talkers');
  console.log(result);

  // if (result) console.log('MySQL Connection OK!');
});
