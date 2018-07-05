const path = require('path');
const route = require('koa-route');

const screenshotPage = require('../lib/screenshot');
const getPath = require('../lib/path');
const {fsExists, fsReadFile, fsMkdir} = require('../lib/fs');

const CACHE_PATH = path.join(__dirname, '../cache');

module.exports = function createSnapshotRoute() {
    return route.get('/snapshot', async (ctx) => {
        let {query} = ctx;
        let {url, quality, force} = query;

        if (url) {
            let image;
            let imagePath = getPath(url);

            if (!force && await fsExists(imagePath)) {
                image = await fsReadFile(imagePath);
            } else {
                if (!await fsExists(CACHE_PATH)) {
                    await fsMkdir(CACHE_PATH);
                }

                image = await screenshotPage({
                    url,
                    quality,
                    path: imagePath
                });
            }

            ctx.set('Content-Type', 'image/jpg');

            ctx.body = image;
        } else {
            ctx.status = 400;
        }
    });
}