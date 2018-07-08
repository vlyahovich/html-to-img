const path = require('path');
const {fsExists, fsMkdir} = require('../lib/fs');

const CACHE_PATH = path.join(__dirname, '../cache');

module.exports = function createCacheDirMiddleware() {
    let cacheDirChecked = false;

    return async (ctx, next) => {
        if (!cacheDirChecked) {
            ctx.cachePath = CACHE_PATH;

            if (!await fsExists(CACHE_PATH)) {
                await fsMkdir(CACHE_PATH);
            }

            cacheDirChecked = true;
        }

        return next();
    };
}