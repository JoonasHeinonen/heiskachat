const router = require('express').Router();
const userRoutes = require('./userRoutes');
const chatRoutes = require('./chatRoutes');

router.use('/', chatRoutes);
router.use('/users', userRoutes);

module.exports = router;