const path = require('path');
const sha256 = require('sha256');

module.exports = {
    getImagePath(url) {
        return path.join(__dirname, `../cache/${sha256(url)}.jpg`);
    },

    getHtmlPath(url) {
        return path.join(__dirname, `../cache/${sha256(url)}.html`);
    },

    getStoragePath(url, partition) {
        let now = new Date();

        return `${partition}/${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${sha256(url)}.jpg`;
    }
}