#!/bin/bash
echo "使用 pm2 启动!"

pm2 start npm --name idiom_server -- start

echo "pm2 启动完成!"
