const config = {};
config.consts = {
    OAUTH_START_URI: process.env.OAUTH_START_URI,
    OAUTH_TOKEN_URI: process.env.OAUTH_TOKEN_URI
}
Object.freeze(config);
module.exports = config;