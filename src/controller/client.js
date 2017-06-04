import PublicError from '../error/public';
import Client from 'avanti-core/dist/client';

export const list = async ctx => {
    ctx.body = await Client.list();
};

export const create = async ctx => {
    if (!ctx.request.body.name) {
        throw (new PublicError('Name is missing')).withStatus(400);
    }

    let client = new Client(ctx.request.body.name);
    await client.create();
    ctx.body = await client.info();
};
