import Koa from 'koa';
import Router from 'koa-router';
import { handle } from './controller';
import JsonBody from 'koa-json-body';
import ErrorMiddleware from './middleware/error';
import TokenMiddleware from './middleware/token';
import setup from 'avanti-core/dist/setup';

setup().then(() => {
    const app = new Koa();
    const router = new Router();

    app.use(ErrorMiddleware());
    app.use(TokenMiddleware());
    app.use(JsonBody({
        strict: true
    }));

    router.get('/client/list', handle('client@list'));
    router.post('/client/create', handle('client@create'));

    router.get('/host/list', handle('host@list'));
    router.post('/host/create', handle('host@create'));
    
    app
        .use(router.routes())
        .use(router.allowedMethods());

    app.listen(3000);
});
