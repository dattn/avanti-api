import Client from 'avanti-core/dist/client';

export const list = async ctx => {
    ctx.body = await Client.list();
};

export const create = async ctx => {
    if (!ctx.request.body.name) {
        let error = new Error('Name is missing');
        error.publicMessage = 'Name is missing';
        error.status = 400;
        throw error;
    }

    let client = new Client(ctx.request.body.name);
    await client.create();
    ctx.body = await client.info();
};
