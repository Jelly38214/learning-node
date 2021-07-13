/**
 * <<深入浅出Nodejs>> - 5.4
 * 严格意义上的缓存有着完善的过期策略,而普通对象的键值对并没有
 * 为了解决缓存中的对象永远无法释放的问题,需要加入一个策略来限制缓存的无限增长
 * 如果需要更高效的缓存,使用LRU算法实现的缓存: https://github.com/isaacs/node-lru-cache
 */
const LimitableMap = function (limit) {
  this.limit = limit || 10;
  this.map = {};
  this.keys = [];
};

const hasOwnProperty = Object.prototype.hasOwnProperty;

LimitableMap.prototype.set = function (key, value) {
  const map = this.map;
  const keys = this.keys;

  if (!hasOwnProperty.call(map, key)) {
    if (keys.length === this.limit) {
      // 一旦超过限制就以先进先去的方式进行淘汰,删除key及其对应的缓存
      var firstKey = keys.shift();
      delete map[firstKey];
    }

    keys.push(key);
  }

  map[key] = value;
};

LimitableMap.prototype.get = function (key) {
  return this.map(key);
};

class SampleCache {
  keys = [];
  cache = {};

  constructor(limit = 10) {
    this.limit = limit;
  }

  set(key, value) {
    if (!this.cache.hasOwnProperty(key)) {
      if (this.keys.length === this.limit) {
        delete this.cache[this.keys.shift()];
      }

      this.keys.push(key);
    }

    this.cache[key] = value;
  }

  get(key) {
    return this.cache[key];
  }
}
