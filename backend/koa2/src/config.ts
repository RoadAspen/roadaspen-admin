/**
 *  config 应用全部的配置
 */

// mongo
export const mongo_db_conf = {
    get db_url(){
        return "mongodb://roadaspen_admin:roadaspen@49.234.6.195:27017/roadaspen_admin"
    }
    // db_url:"mongodb://localhost:27017/runoob"
}

// redis
export const redis_db_conf = {
    get host(){
        return "49.234.6.195"
    },
    get port(){
        return 6379
    },
    get pwd(){
        return 'roadaspen'
    }
}

// 加密token 的secret， 为了安全也可以存放在数据库中
export const app_secret_key = 'roadaspen_admin_koa2';


// 白名单 ，不需要token验证

export const write_list = ['/login/','/captchaImage/']
 