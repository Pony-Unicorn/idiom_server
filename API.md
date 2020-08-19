## 接口文档

## 测试网地址："https://idiom-test.52js.net"
## 正式网地址：

### 接口规范：
 * 类型标注语法使用 typescript 类型系统

#### 登录(初始化信息)：
  * 路由 game_init
  * 参数

```
{
    uid: string, // 没有 uid 默认为新用户
    js_code: string // 没有 uid 的时候通过 wx.login 获取 code
}
```

  * 返回值：

```
{
    uid: string, // 用户游戏 ID
    currentLevel: number, // 当前用户等级（身份）
    currentPoint: number, // 当前关卡数
    pointState: boolean, // 当前关卡是否已通过
    strength: number, // 当前剩余体力值
    maxStrength: number, // 体力值上限
    coolingTime: number // 下一次体力冷却剩余时间
}
```

#### 关卡开始、结束：
  * 路由 point_pass
  * 参数

```
{
    uid: string,
    type: string // 0 或 1，0 为开始，1为结束
}
```

  * 返回值：

```
{
    currentLevel: number, // 当前用户等级（身份）
    currentPoint: number, // 当前关卡数
    pointState: boolean, // 当前关卡是否已通过
    strength: number, // 当前剩余体力值
    maxStrength: number, // 体力值上限
    coolingTime: number // 下一次体力冷却剩余时间, 精确到秒
}
```

#### 恢复体力（冷却）：
  * 路由 physical_recovery
  * 参数

```
{
    uid: string
}
```

  * 返回值：

```
{
    strength: number, // 当前剩余体力值
    coolingTime: number // 下一次体力冷却剩余时间, 精确到秒
}
```
