module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('', 'http://localhost:1337'),
  //url: env('', 'http://138.197.160.154:1337'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'd061a4cfadb914ab2eede9e6c152eceb'),
    },
  },
});
