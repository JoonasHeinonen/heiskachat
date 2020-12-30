const router = require('express').Router();
const chatController = require('../controllers/chatController');

router.get('/', chatController.chat);

module.exports = router;