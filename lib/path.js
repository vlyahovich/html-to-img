const path = require('path');
const sha256 = require('sha256');

module.exports = function getPath(url) {
    return path.join(__dirname, `../cache/${sha256(url)}.jpg`);
}