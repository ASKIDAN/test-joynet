let CacheManager = require('../modules/cacheManager');
let cachm = new CacheManager(60000);

let cachedResponse = (req, res, next) => {
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