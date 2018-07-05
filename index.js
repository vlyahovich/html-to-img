const Koa = require('koa');
const app = new Koa();
const logger = require('koa-logger');

const createStaticMiddleware = require('./middlewares/koaStaticMiddleware');
const createSnapshotRoute = require('./middlewares/koaSnapshoutMiddleware');

const PORT = process.env.PORT || 3256;

// logger
app.use(logger())

// static
app.use(createStaticMiddleware());
 
// routes
app.use(createSnapshotRoute());
 
app.listen(PORT);