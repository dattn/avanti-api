import jwt from 'jsonwebtoken';
import uuid from 'uuid/v4';

const TOKEN_SECRET = process.env.TOKEN_SECRET || uuid();

export const create = ip => {
    return new Promise((resolve, reject) => {
        jwt.sign({ ip }, TOKEN_SECRET, {}, (err, token) => {
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
        jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
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
