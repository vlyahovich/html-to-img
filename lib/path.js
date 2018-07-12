const path = require('path');
const sha256 = require('sha256');

function zeroPrefixed(num) {
    return num < 10 ? '0' + num : num;
}

module.exports = {
    getImagePath(url) {
        return path.join(__dirname, `../cache/${sha256(url)}.jpg`);
    },

    getHtmlPath(url) {
        return path.join(__dirname, `../cache/${sha256(url)}.html`);
    },

    getStoragePath(url, partition) {
        let now = new Date();
        let y = now.getFullYear();
        let m = zeroPrefixed(now.getMonth());
        let d = zeroPrefixed(now.getDate());

        return `${partition}/${y}-${m}-${d}-${sha256(url)}.jpg`;
    }
}