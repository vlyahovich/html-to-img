const route = require('koa-route');

const screenshotPage = require('../lib/screenshot');
const {hasStorage, upload, properties} = require('../lib/azure');
const {getHtmlPath, getImagePath, getStoragePath} = require('../lib/path');
const {fsWriteFile, fsUnlink} = require('../lib/fs');

const NOT_FOUND_MESSAGE = 'NotFound';

module.exports = function createSnapshotHtmlRoute() {
    return route.post('/snapshot', async (ctx) => {
        if (!hasStorage()) {
            ctx.status = 404;

            return;
        }

        let {query} = ctx;
        let {quality} = query;
        let data = ctx.request.body;

        if (data && data.htmlString && data.partition) {
            let {htmlString, partition} = data;
            let url = htmlString + partition;
            let htmlPath = getHtmlPath(url);
            let imagePath = getImagePath(url);
            let storagePath = getStoragePath(url, partition);
            let storageProps = null;

            try {
                storageProps = await properties(storagePath);
            } catch (e) {
                if (e.message !== NOT_FOUND_MESSAGE) {
                    throw e;
                }
            }

            if (storageProps) {
                ctx.body = {
                    path: storagePath
                };
            } else {
                await fsWriteFile(htmlPath, htmlString);

                await screenshotPage({
                    url: 'file://' + htmlPath,
                    path: imagePath,
                    quality
                });

                await upload(storagePath, imagePath);

                ctx.set('Content-Type', 'application/json');

                ctx.body = {
                    path: storagePath
                };

                await fsUnlink(htmlPath);
                await fsUnlink(imagePath);
            }
        } else {
            ctx.status = 400;
        }
    });
}