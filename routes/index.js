const express = require('express');
const router = express.Router();

const test = require('../controller/test');

const init = require('../controller/init'); // 游戏初始化和登录
const pointPass = require('../controller/pointPass'); // 关卡

router.get('/test', test.test);

router.get('/game_init', init);
router.get('/point_pass', pointPass);

module.exports = router;
