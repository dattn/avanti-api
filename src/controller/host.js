import Host from 'avanti-core/dist/host';

export const list = async ctx => {
    ctx.body = await Host.list();
};
