// import environment variables
require('dotenv').config();

////////////////////////////////////////////////////////////////////////////////

const SERVER = {
    HOST: process.env.SERVER_HOST || 'localhost',
    PORT: process.env.SERVER_PORT || process.env.PORT || 3000,
    SCHEMA: process.env.SERVER_SCHEMA || 'http',
};

const API = {
    VERSION: process.env.API_VERSION || 1,
};


////////////////////////////////////////////////////////////////////////////////

const server = {
    host: SERVER.HOST,
    port: SERVER.PORT,
    schema: SERVER.SCHEMA,
    url: `${SERVER.SCHEMA}://${SERVER.HOST}:${SERVER.PORT}`,
};

const api = {
    url: `${server.url}/api/v${API.VERSION}`,
    version: API.VERSION,
};

////////////////////////////////////////////////////////////////////////////////

export default { api, server };
