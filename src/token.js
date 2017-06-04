import jwt from 'jsonwebtoken';

export const create = ip => {
    return new Promise((resolve, reject) => {
        jwt.sign({ ip }, 'SECRET', {}, (err, token) => {
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
        jwt.verify(token, 'SECRET', (err, decoded) => {
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
