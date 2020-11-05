'use strict'
const { fetchToken } = require('../../services/oauth');

module.exports = async function (fastify, opts) {
  fastify.get('/fetch_and_save', async function (request, reply) {

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
    // Store data in 
    // 1. Database or 2. Send to your api Server
    // 3. Or send it to page in the response. (Not recommended in Production). 

    //1. 
    // INSERT token and user INTO YOUR Database.

    //2. Send to your api server
    // const axios = require('axios');
    // await axios.post('https://your_server_url', data) 


    //3. 
    // Display it on screen.
    return reply.send(JSON.stringify(data, null, 3));

  })
}
