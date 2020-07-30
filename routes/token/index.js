'use strict'
const axios = require('axios');
const config = require('../../config/config');
const qs = require('qs');

async function fetchToken(grant_type, { code, refresh_token, scope }) {
  try {
    const result = await axios({
      url: config.consts.OAUTH_TOKEN_URI,
      method: 'POST',
      json: true,
      data: qs.stringify({
        grant_type: grant_type,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: code,
        refresh_token: refresh_token,
        scope: scope
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    });
    return result;
  } catch (err) {
    throw err;
  }

}
module.exports = async function (fastify, opts) {
  fastify.get('/fetch_and_save', async function (request, reply) {

    // console.log(request.query);
    request.log.info(request.query)
    const { code, state } = request.query;
    const scope = "";

    if (!code || !state || !code.length || !state.length) {
      throw new Error("Invalid Payload")
    }
    // TODO: Validate State using some dynamic value. 
    if (state != process.env.STATE) {
      throw new Error("Invalid State")
    }
    const {data} = await fetchToken('authorization_code', { code, scope });
    request.log.info(data);
    return reply.send(JSON.stringify(data, null, 3));
    /* fastify.mysql.getConnection(onConnect)

    function onConnect(err, client) {
      if (err) return reply.send(err)
      let { userId, accessToken, refreshToken, accessTokenExpiresAt, refreshTokenExpiresAt, scope } = request.query;
      let sqlQuery = `INSERT IGNORE INTO ${process.env.TOKEN_TABLE_NAME || 'TOKENS'} (userId, accessToken, refreshToken, accessTokenExpiresAt, refreshTokenExpiresAt, scope) VALUES (?,?,?,?,?,?) ON DUPLICATE KEY UPDATE userId=?, accessToken=?, refreshToken=?, accessTokenExpiresAt=?, refreshTokenExpiresAt=?, scope=?`
      let sqlQueryValues = [userId, accessToken, refreshToken, accessTokenExpiresAt, refreshTokenExpiresAt, scope];
      client.query(
        sqlQuery, [...sqlQueryValues, ...sqlQueryValues],
        function onResult(err, result) {
          client.release();
          if (err) {
            return reply.send(err);
          }
          return reply.view('success.ejs', {
            success: 1, userId, accessToken, refreshToken, accessTokenExpiresAt: new Date(accessTokenExpiresAt) != "Invalid Date" ? new Date(accessTokenExpiresAt).toLocaleString() : "", refreshTokenExpiresAt: new Date(refreshTokenExpiresAt) != "Invalid Date" ? new Date(refreshTokenExpiresAt).toLocaleString() : "", scope
          })
        }
      )
    } */
  })
}
