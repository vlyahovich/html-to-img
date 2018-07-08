const route = require('koa-route');

const screenshotPage = require('../lib/screenshot');
const {getImagePath} = require('../lib/path');
const {fsExists, fsReadFile} = require('../lib/fs');

module.exports = function createSnapshotRoute() {
    return route.get('/snapshot', async (ctx) => {
        let {query} = ctx;
        let {url, quality, force} = query;

        if (url) {
            let image;
            let imagePath = getImagePath(url);

            if (!force && await fsExists(imagePath)) {
                image = await fsReadFile(imagePath);
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