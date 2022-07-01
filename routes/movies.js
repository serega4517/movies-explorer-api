const router = require('express').Router();

const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  validationMovie,
  validateMovieId,
} = require('../middlewares/validation');

router.get('/movies', getMovies);
router.post('/movies', validationMovie, addMovie);
router.delete('/movies/:movieId', validateMovieId, deleteMovie);

module.exports = router;
