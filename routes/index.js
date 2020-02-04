const express = require('express');
const router = express.Router();

const gameController = require('./gameController');

router.get('/game_init', gameController.init);
router.get('/point_pass', gameController.pointPass);

module.exports = router;
