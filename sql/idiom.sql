/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80013
 Source Host           : localhost:3306
 Source Schema         : idiom

 Target Server Type    : MySQL
 Target Server Version : 80013
 File Encoding         : 65001

 Date: 02/02/2020 23:17:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '序号',
  `status` int(1) unsigned NOT NULL DEFAULT '0' COMMENT '状态',
  `open_id` varchar(64) NOT NULL DEFAULT '',
  `cur_level` int(11) unsigned NOT NULL DEFAULT '1' COMMENT '用户等级',
  `cur_point` int(11) unsigned NOT NULL DEFAULT '1' COMMENT '现在关卡',
  `is_pass` int(1) NOT NULL DEFAULT '0' COMMENT '是否通关',
  `strength` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '剩余体力值',
  `max_strength` int(11) unsigned NOT NULL DEFAULT '5' COMMENT '体力值上限',
  `last_time_strength` datetime NOT NULL COMMENT '上一次刷新体力值时间',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

SET FOREIGN_KEY_CHECKS = 0;
