'use strict'

const { test } = require('tap')
const { build } = require('../helper')
const ejs = require('ejs');
const fs = require('fs');

test('default root route', async (t) => {
  const app = build(t)

  const res = await app.inject({
    url: '/'
  })
  let data = {
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.REDIRECT_URI,
    state: process.env.STATE
  };
  t.equal(ejs.render(fs.readFileSync('./public/index.ejs', 'utf8'), data), res.payload.toString());

});
