const express = require('express');
const router = express.Router();

const testController = require('./testController');

const gameController = require('./gameController');

router.get('/test', testController.test);

router.get('/game_init', gameController.init);
router.get('/point_pass', gameController.pointPass);

module.exports = router;
