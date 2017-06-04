import Client from 'avanti-core/dist/client';
import Host from 'avanti-core/dist/host';

export const list = async ctx => {
    ctx.body = await Host.list();
};

export const create = async ctx => {
    if (!ctx.request.body.client) {
        let error = new Error('Client is missing');
        error.publicMessage = 'Client is missing';
        error.status = 400;
        throw error;
    }

    if (!ctx.request.body.host) {
        let error = new Error('Host is missing');
        error.publicMessage = 'Host is missing';
        error.status = 400;
        throw error;
    }

    let host = (await Client.get(ctx.request.body.client)).host(ctx.request.body.host);
    await host.create(ctx.request.body);
    ctx.body = await host.info();
};
