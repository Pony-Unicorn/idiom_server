const App = require('./App');
const gameConf = require('./gameConf');

async function init() {
    await gameConf.init([
        'bases'
    ]);
    new App();
}

init().then(() => {
    console.log('初始化成功');
});
