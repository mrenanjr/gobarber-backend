export default {
    jwt: {
        secret: process.env.APP_SECRECT || 'default',
        expiresIn: '1d',
    },
};
