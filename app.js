'use strict'
const dotenv = require('dotenv');
try{
  const result = dotenv.config();
  if(result.error){
    console.warn("Could not load environment file");
  }
}catch(err){
  console.warn("Could not load environment file");
}

const path = require('path')
const fastify = require('fastify')({
  logger: {
    level: 'info',
    // file: '/path/to/file' // will use pino.destination()
  }
})
const AutoLoad = require('fastify-autoload');

const app = fastify;

// Place here your custom code!

// Do not touch the following lines

// This loads all plugins defined in plugins
// those should be support plugins that are reused
// through your application
app.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins'),
  // options: Object.assign({}, opts)
})

// This loads all plugins defined in routes
// define your routes in one of these
app.register(AutoLoad, {
  dir: path.join(__dirname, 'routes'),
  // options: Object.assign({}, opts)
});

app.register(require('point-of-view'), {
  root: path.join(__dirname, 'public'),
  engine: {
    ejs: require('ejs')
  }
});

// app.register(require('fastify-mysql'), {
//   connectionString: process.env.DB_CONN_STRING
// });

app.listen(process.env.PORT || 3200);
