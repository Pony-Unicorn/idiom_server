const App = require('./App');

async function init() {
    new App();
}

init().then(() => {
    console.log('初始化成功');
});
