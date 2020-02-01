const express = require('express');

const testController = require('./testController');

const router = express.Router();

router.get('/test', testController.test);

module.exports = router;
