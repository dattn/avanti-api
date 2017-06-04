import Client from 'avanti-core/dist/client';
import Host from 'avanti-core/dist/host';
import PublicError from '../error/public';

export const list = async ctx => {
    ctx.body = await Host.list();
};

export const create = async ctx => {
    if (!ctx.request.body.client) {
        throw (new PublicError('Client is missing')).withStatus(400);
    }

    if (!ctx.request.body.host) {
        throw (new PublicError('Host is missing')).withStatus(400);
    }

    let host = (await Client.get(ctx.request.body.client)).host(ctx.request.body.host);
    await host.create(ctx.request.body);
    ctx.body = await host.info();
};
