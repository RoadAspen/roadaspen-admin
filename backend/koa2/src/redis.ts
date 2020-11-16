import Redis from "ioredis";
import {redis_db_conf} from './config';
const redis = new Redis({
    port:redis_db_conf.port,
    host:redis_db_conf.host,
    password:redis_db_conf.pwd,
    db: 0
}); 

redis.on('connect', () => {
    console.log('redis连接成功')
})

export default redis;