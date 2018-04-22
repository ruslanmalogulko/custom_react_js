const isClass = item => (typeof(item) === 'function' && item.prototype.render);

const isStateless = item => (typeof(item) === 'function' && !item.prototype.render);

const isArray = item => Array.isArray(item);

const isObject = item => !isArray(item) && typeof(item) === 'object';

const utils = {
    isClass,
    isStateless,
    isArray,
    isObject
};

export default utils;