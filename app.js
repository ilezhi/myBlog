const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const Bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-session2');

require('./models');

const index = require('./routes');

const app = new Koa();
const router = Router();
const bodyparser = Bodyparser();

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/assets'));
app.use(require('koa-static')(__dirname + '/public'));
app.use(session({
  key: 'weelsblog'
}));

app.use(views(__dirname + '/views'), {
  map: {
    html: 'ejs'
  }
});

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});


app.use(async (ctx, next) => {
  await index.routes()(ctx, next);
});
// router.use('/', index.routes(), index.allowedMethods());
// app.use(router.routes(), router.allowedMethods());


app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx);
});

module.exports = app;
