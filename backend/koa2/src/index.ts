import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import statics from 'koa-static';
import Router from 'koa-router';
import db from './db/mongo';
import {redis_db_conf} from './config';
import path from 'path';
import { loadModules } from './loadModules';
import redisStore from 'koa-redis';
import redis from 'redis';

const app = new Koa();
app.keys = [];

const client = redis.createClient(redis_db_conf.port,redis_db_conf.host)
const options = {client: client, db: 1};
const store = redisStore(options);

// body解析
app.use(bodyparser());

// 静态资源解析
app.use(statics(path.join(__dirname, 'static')));

// 获取 views 文件夹下所有的文件，然后获取每个文件名，根据文件名添加router方法
const router = new Router();

app.use(async (ctx,next)=>{
    if(ctx.path === '/favicon.ico') return 
    next()
})
async function bootstrap(router: Router<any, {}>) {
    const router_list = await loadModules(path.resolve(__dirname,'views'));
    for(const item of router_list) {
        switch(item.methods) {
            case 'get':
                router.get(item.url, item.func);
                break;
            case 'post':
                router.post(item.url, item.func);
                break;
            case 'patch':
                router.patch(item.url, item.func);
                break;
            case 'delete':
                router.delete(item.url, item.func);
                break;
            default:
                break;
        }
    }
    // 启动 router
    app.use(router.routes()).use(router.allowedMethods());
    // app.listen(8081);
    db.on('connected', function() {
        console.log('Mongoose 连接到 example数据库');
    }) 
    db.once('open', function() {
        app.listen(8081);
        console.log('服务器连接成功 at 8081');
    });
}

bootstrap(router);
