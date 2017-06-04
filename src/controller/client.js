import Client from 'avanti-core/dist/client';

export const list = async ctx => {
    ctx.body = await Client.list();
};
