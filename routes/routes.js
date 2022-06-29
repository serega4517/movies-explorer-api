const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateLogin, validateUser } = require('../middlewares/validation');

const NotFound = require('../errors/NotFound');

router.post('/signin', validateLogin, login);
router.post('/signup', validateUser, createUser);

router.use(auth);
router.use(usersRouter);
router.use(moviesRouter);

router.use('/', (req, res, next) => {
  next(new NotFound('Такой страницы не существует'));
});

module.exports = router;
