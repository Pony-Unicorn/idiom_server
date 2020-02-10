const express = require('express');
const router = express.Router();

const test = require('../controller/test'); // 测试接口

const init = require('../controller/init'); // 游戏初始化和登录
const pointPass = require('../controller/pointPass'); // 关卡
const physicalRecovery = require('../controller/physicalRecovery'); // 恢复体力（冷却）

router.get('/test', test);

router.get('/game_init', init);
router.get('/point_pass', pointPass);
router.get('/physical_recovery', physicalRecovery);

module.exports = router;
