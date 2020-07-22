'use strict'

const { test } = require('tap')
const { build } = require('../helper')
const ejs = require('ejs');
const fs = require('fs');

test('token is saved', async (t) => {
  const app = build(t)

  let userId = "1234567890";
  let accessToken = "1234567892";
  let refreshToken = "1234567892";
  let scope = "1234567892";
  let accessTokenExpiresAt = "2020-07-23T13:01:12.677Z";
  let refreshTokenExpiresAt = "2020-07-23T13:01:12.677Z";
  const res = await app.inject({
    url: `token/save?userId=${userId}&accessToken=${accessToken}&refreshToken=${refreshToken}&scope=${scope}&accessTokenExpiresAt=${accessTokenExpiresAt}&refreshTokenExpiresAt=${refreshTokenExpiresAt}`,
  })
  let data = {
    userId, accessToken, refreshToken, scope,
    accessTokenExpiresAt: new Date(accessTokenExpiresAt).toLocaleString(),
    refreshTokenExpiresAt: new Date(refreshTokenExpiresAt).toLocaleString(),
    success: 1
  };
  t.equal(ejs.render(fs.readFileSync('./public/success.ejs', 'utf8'), data), res.payload.toString());
})
