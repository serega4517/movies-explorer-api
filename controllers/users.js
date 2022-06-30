const { NODE_ENV, JWT_SECRET } = process.env;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const ConflictError = require('../errors/ConflictError');
const AuthorizationError = require('../errors/AuthorizationError');

const { DEV_JWT } = require('../utils/config');

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFound('Пользователь по указанному id не найден'));
      }
      return res.send(user);
    })
    .catch((err) => next(err));
};

const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        return next(new NotFound('Пользователь не найден'));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('При обновлении данных пользователя переданы невалидные данные'));
      }
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь с таким email уже существует'));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданы невалидные данные'));
      }
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь с таким email уже существует'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      // почта и пароль совпали, создаем JWT сроком на неделю
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => next(new AuthorizationError('Неправильные почта или пароль')));
};

module.exports = {
  getCurrentUser,
  updateUserInfo,
  createUser,
  login,
};
