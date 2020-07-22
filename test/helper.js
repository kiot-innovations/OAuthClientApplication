'use strict'

// This file contains code that we reuse
// between our tests.

const Fastify = require('fastify')
const fp = require('fastify-plugin')
const App = require('../app')

// Fill in this config with all the configurations
// needed for testing the application
function config() {
  return {}
}

// automatically build and tear down our instance
function build(t) {
  const app = Fastify()

  // fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup
  app.register(fp(App), config())

  setEnvironment();

  // tear down our app after we are done
  t.tearDown(app.close.bind(app))

  return app
}

function setEnvironment() {
  process.env.CLIENT_ID = "dummyclient";
  process.env.REDIRECT_URI = "dummyurl";
  process.env.STATE = "dummystate";
}

module.exports = {
  config,
  build
}
