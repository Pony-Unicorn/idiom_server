/**
 * 全局配置信息
 * 外部必须通过 get 方法读取
 */
const conf = require('./conf');

/**
 * 根据路径获取指定的节点
 * @param {Array<string>} path - 路径
 * @param {{[index:string]: any}} stateTree 
 */
const getNodeByPath = (path, stateTree) => {

    const subPath = path.shift();
    const subStateTree = Array.isArray(stateTree) ? stateTree[Number(subPath)] : stateTree[subPath];

    if (typeof subStateTree === 'undefined') {
        throw new Error('路径不存在');
    }

    if (path.length === 0) {
        return subStateTree;
    }

    return getNodeByPath(path, subStateTree);
}

/**
 * 检查是否存在
 */
const hasProperty = () => {

}

/**
 * 以为句点的方式访问配置数据，如果是数组支持索引的方式。
 * 例: `{a:{b;{c:90,d:['pony']}}}`，get('a.b.c') = 90, get('a.b.d.0') = 'pony'
 * @param {string} keyPath 
 */
const get = keyPath => {

    if (typeof keyPath === 'undefined') {
        throw new Error('keyPath 参数不存在');
    }

    const path = keyPath.split('.');

    return getNodeByPath(path, conf);
}

/**
 * 检验 keyPath 是否存在
 * @param {string} keyPath 
 */
const has = keyPath => {
    console.warn('尚未实现');
}

module.exports = {
    get,
    has
}
