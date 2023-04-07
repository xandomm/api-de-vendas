export default {
  jwt: {
    secret: process.env.CLIENT_SECRET,
    expires_in: '1d',
  },
  refresh_jwt: {
    secret: process.env.REFRESH_TOKEN_SECRET,
    expires_in: '12m',
  },
};
