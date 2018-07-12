const puppeteer = require('puppeteer');

module.exports = async function screenshotPage({url, path, quality}) {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    await page.setViewport({
        width: 1,
        height: 1
    });

    await page.goto(url);

    image = await page.screenshot({
        path,
        fullPage: true,
        type: 'jpeg',
        quality: quality || 80
    });

    await browser.close();

    return image;
}