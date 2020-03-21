function test() {
    return sequelize.transaction(t => {
        // 在这里链接你的所有查询. 确保你返回他们.
        return User.create({
            firstName: 'Abraham',
            lastName: 'Lincoln'
        }, { transaction: t }).then(user => {
            return user.setShooter({
                firstName: 'John',
                lastName: 'Boothe'
            }, { transaction: t });
        });

    }).then(result => {
        // 事务已被提交
        // result 是 promise 链返回到事务回调的结果
    }).catch(err => {
        // 事务已被回滚
        // err 是拒绝 promise 链返回到事务回调的错误
    });
}
