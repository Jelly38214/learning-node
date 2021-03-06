const { REDIS_CONF } = require("../config/db");

const redis = require("redis");
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);

redisClient.on("error", () => {
  console.error(err);
});

function redisSet(key, value) {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }

  redisClient.set(key, value, redis.print);
}

function redisGet(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, value) => {
      if (err) {
        reject(err);
        return;
      }

      if (val === null) {
        resolve(null);
        return;
      }

      try {
        resolve(JSON.parse(value));
      } catch (error) {
        resolve(value);
      }
    });
  });
}

module.exports = {
  redisSet,
  redisGet,
};
