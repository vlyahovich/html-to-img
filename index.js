if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const Koa = require('koa');
const app = new Koa();
const logger = require('koa-logger');
const body = require('koa-body');
const error = require('koa-json-error');

const createStaticMiddleware = require('./middlewares/koaStaticMiddleware');
const createUuidMiddleware = require('./middlewares/koaUuidMiddleware');
const createCacheDirMiddleware = require('./middlewares/koaCacheDirMiddleware');
const createSnapshotRoute = require('./middlewares/koaSnapshotMiddleware');
const createSnapshotHtmlRoute = require('./middlewares/koaSnapshotHtmlMiddleware');

const PORT = process.env.PORT || 3256;

// error
app.use(error());

// logger
app.use(logger());

// body parser
app.use(body());

// static
app.use(createStaticMiddleware());

// util
app.use(createUuidMiddleware());
app.use(createCacheDirMiddleware());
 
// routes
app.use(createSnapshotRoute());
app.use(createSnapshotHtmlRoute());

// dafault
app.use(async (ctx, next) => {
    ctx.body = 'OK';

    return next();
});

app.listen(PORT, () => {
    console.log(`Server is listeining on ${process.env.HOST || 'http://127.0.0.1'}:${PORT}`);
});