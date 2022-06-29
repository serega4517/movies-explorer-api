const Movie = require('../models/movie');

const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ movies }))
    .catch(next);
};

const addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Данные новой карточки невалидны'));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFound('Карточка не найдена');
    })
    .then((movie) => {
      if (movie.owner.equals(req.user._id)) {
        Movie.findByIdAndRemove(movieId)
          .then(() => res.send(movie));
      }
      return next(new ForbiddenError('Невозможно удалить чужую карточку'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Передан некорректный id карточки'));
      }
      return next(err);
    });
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
