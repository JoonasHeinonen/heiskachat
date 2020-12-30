const router = require('express').Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.users);
router.get('/login', usersController.login);
router.get('/signup', usersController.new);
router.post('/create', usersController.create, usersController.redirectView);

module.exports = router;