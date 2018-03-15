const config = require('config');
const CacheManager = require('../modules/cacheManager');
const cachm = new CacheManager(config.get("API.cacheAlive"));

const cachedResponse = (req, res, next) => {
    const key = '__test-joynet__' + req.url;
    let cached = cachm.get(key);
    if (cached) {
        console.log('cached');
        res.send(cached.value);
    } else {
        res.sendResponse = res.send;
        res.send = (body) => {
            cachm.push(key, body);

            res.sendResponse(body);
        };
        next();
    }
};

module.exports = cachedResponse;