const puppeteer = require('puppeteer');
const getPath = require('./path');

module.exports = async function screenshotPage({url, viewport, quality}) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({
        width: 1,
        height: 1
    });

    await page.goto(url);

    image = await page.screenshot({
        path: getPath(url),
        fullPage: true,
        type: 'jpeg',
        quality: quality || 70
    });

    await browser.close();

    return image;
}