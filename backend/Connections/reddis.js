import {createClient} from "redis";

import constants from "../Constants/constants.js";

const client = createClient({
    username: 'default',
    password: constants.redis_password,
    socket: {
        host: constants.redis_host,
        port: constants.redis_port
    }
});






client.on('error', err => console.log('Redis Client Error', err));


export default client;





