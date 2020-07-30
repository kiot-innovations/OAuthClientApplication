const axios = require('axios');
const config = require('../config/config');
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

module.exports = {
    fetchToken
}
