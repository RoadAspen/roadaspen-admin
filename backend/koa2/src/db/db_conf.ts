import { PoolConfig } from "mysql";

export const mysql_db_conf:PoolConfig = {
    host:'49.234.6.195',
    port:3306,
    user:'root',
    password:'nzy123456',
    database:'roadaspen_admin'
}


export const mongo_db_conf = {
    db_url:"mongodb://49.234.6.195:27017/roadaspen_admin"
    // db_url:"mongodb://localhost:27017/runoob"
}