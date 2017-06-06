import jwt from 'jsonwebtoken';

const getTokenSecret = () => {
    if (process.env.TOKEN_SECRET) {
        return process.env.TOKEN_SECRET;
    }
    throw new Error('"TOKEN_SECRET" env missing');
};

export const create = ip => {
    return new Promise((resolve, reject) => {
        jwt.sign({ ip }, getTokenSecret(), {}, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
};

export const verify = (token, ip) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, getTokenSecret(), (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                if (ip === decoded.ip) {
                    resolve(decoded);
                } else {
                    reject(new Error('Invalid IP'));
                }
            }
        });
    });
};
