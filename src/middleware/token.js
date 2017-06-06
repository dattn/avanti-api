import * as Token from '../token';

export default () => async (ctx, next) => {
    if (!ctx.request.header.authorization) {
        throw new Error('Missing authorization header');
    }
    const [ type, token ] = ctx.request.header.authorization.split(' ', 2);
    if (!token
            || type !== 'Bearer'
            || !await Token.verify(token, ctx.request.ip)) {
        throw new Error('Invalid token');
    }
    await next();
};
