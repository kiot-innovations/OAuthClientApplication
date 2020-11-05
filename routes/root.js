'use strict'
const config = require('../config/config');


module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const client_id = process.env.CLIENT_ID,
      redirect_uri = `${process.env.APP_HOST_URL}/token/fetch_and_save`,
      state = process.env.STATE;
      console.log(`${config.consts.OAUTH_START_URI}?client_id=${client_id}\&state=${state}\&redirect_uri=${redirect_uri}`)
    return reply.view('index.ejs',
      {
        authStartUri: `${config.consts.OAUTH_START_URI}?client_id=${client_id}\&state=${state}\&redirect_uri=${redirect_uri}`,
        authClientName: process.env.CLIENT_DISPLAY_NAME || "Third Party Client"
      });
  });
}
