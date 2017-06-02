import Koa from 'koa';
import Router from 'koa-router';
import { handle } from './controller';

const app = new Koa();
const router = new Router();

router.get('/host/list', handle('host@list'));
app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
