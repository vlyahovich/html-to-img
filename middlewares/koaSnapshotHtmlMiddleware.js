const route = require('koa-route');

const screenshotPage = require('../lib/screenshot');
const {getHtmlPath, getStoragePath} = require('../lib/path');
const {fsWriteFile, fsUnlink} = require('../lib/fs');

module.exports = function createSnapshotHtmlRoute() {
    return route.post('/snapshot', async (ctx) => {
        let data = ctx.request.body;
        
        if (data && data.htmlString && data.partition) {
            let {htmlString, partition} = data;
            let url = htmlString + partition;
            let htmlPath = getHtmlPath(url);

            await fsWriteFile(htmlPath, htmlString);

            let image = await screenshotPage({
                url: 'file://' + htmlPath
            });

            if (process.env.AZURE_STORAGE_KEY) {
                let storagePath = getStoragePath(url, partition);
                // TODO: send screenshot to azure storage
            }

            ctx.set('Content-Type', 'image/jpg');

            ctx.body = image;

            await fsUnlink(htmlPath);
        } else {
            ctx.status = 400;
        }
    });
}