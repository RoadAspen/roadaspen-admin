import { PoolConfig } from "mysql";

export const mysql_db_conf:PoolConfig = {
    host:'127.0.0.1:27017',
    port:3306,
    user:'root',
    password:'123456',
    database:'roadaspen_admin'
}


export const mongo_db_conf = {
    db_url:"mongodb://127.0.0.1:27017/roadaspen_admin"
    // db_url:"mongodb://localhost:27017/runoob"
}