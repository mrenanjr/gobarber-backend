export default {
    jwt: {
        secret: process.env.APP_SECRECT,
        expiresIn: '1d',
    },
};
