import * as Task from 'avanti-core/dist/task';

export const status = async ctx => {
    try {
        await Task.run('ftp.status');
        ctx.body = 'running';
    } catch (err) {
        ctx.body = err.message;
        ctx.status = 500;
    }
};
