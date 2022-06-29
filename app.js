require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const errorsHandler = require('./middlewares/errorsHandler');
const router = require('./routes/routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env; // слушаем 3000 порт

const app = express(); // создаем приложение

mongoose.connect('mongodb://localhost:27017/moviesexplorerdb'); // подключаемся к серверу mongo

app.use(express.json());

app.use(requestLogger); // подключаем логгер запросов

app.use(router); // подключение роутов

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(errorsHandler); // подключаем централизованный обработчик ошибок

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
