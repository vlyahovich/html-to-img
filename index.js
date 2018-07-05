const Koa = require('koa');
const app = new Koa();
const logger = require('koa-logger')

const createStaticMiddleware = require('./middlewares/koaStaticMiddleware');
const createSnapshotRoute = require('./middlewares/koaSnapshoutMiddleware');

// logger
app.use(logger())

// static
app.use(createStaticMiddleware());
 
// routes
app.use(createSnapshotRoute());
 
app.listen(3000);