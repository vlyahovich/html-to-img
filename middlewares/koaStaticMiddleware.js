const path = require('path');
const serve = require('koa-static');

module.exports = function createStaticMiddleware() {
    return serve(path.join(__dirname, '../public'));
}