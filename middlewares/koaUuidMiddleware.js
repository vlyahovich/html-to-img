const uuidv1 = require('uuid/v1');

module.exports = function createUuidMiddleware() {
    return (ctx, next) => {
        ctx.uuid = uuidv1();

        return next();
    };
}