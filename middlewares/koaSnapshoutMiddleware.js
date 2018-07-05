const path = require('path');
const route = require('koa-route');

const screenshotPage = require('../lib/screenshot');
const getPath = require('../lib/path');
const {fileExists, readFile} = require('../lib/fs');

module.exports = function createSnapshotRoute() {
    return route.get('/snapshot', async (ctx) => {
        let {query} = ctx;
        let {url, quality, force} = query;

        if (url) {
            let image;
            let imagePath = getPath(url);

            if (!force && await fileExists(imagePath)) {
                image = await readFile(imagePath);
            } else {
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