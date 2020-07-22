'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return reply.view('index.ejs',
      {
        client_id: process.env.CLIENT_ID,
        redirect_uri: process.env.REDIRECT_URI,
        state: process.env.STATE
      });
  });
}
