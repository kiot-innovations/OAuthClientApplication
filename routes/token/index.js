'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/save', async function (request, reply) {
    fastify.mysql.getConnection(onConnect)

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
    }
  })
}
