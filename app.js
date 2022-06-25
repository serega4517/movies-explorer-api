const express = require('express');
const mongoose = require('mongoose');

const errorsHandler = require('./middlewares/errorsHandler');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

// Создаем приложение
const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/moviesexplorerdb');

app.use(errorsHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
