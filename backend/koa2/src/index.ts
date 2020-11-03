import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import statics from 'koa-static';
import Router from 'koa-router';
// import query from './db/mysqlquery';
import db from './db/mongo';
import path from 'path';
import { loadModules } from './loadModules';

import session from 'koa-session';
import redis from 'koa-redis';

const app = new Koa();

app.keys = ['this_is_app_secret_key'];

const sessionConfig = { // 基础配置
    key: 'koa:sess', //cookie key (default is koa:sess)
    maxAge: 86400000, // cookie的过期时间(默认是一天)
    overwrite: true, //是否可以重写    (默认default true)
    httpOnly: true, //cookie是否只有服务器端可以访问，不允许js访问 httpOnly or not (default true)
    signed: true, // 签名默认 true， 是否添加签名
    rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false, // 当会话接近过期时 更新会话,
};


app.use(session(sessionConfig, app));
// body解析
app.use(bodyparser());

// 静态资源解析
app.use(statics(path.join(__dirname, 'static')));

// 获取 views 文件夹下所有的文件，然后获取每个文件名，根据文件名添加router方法
const router = new Router();

// app.use(async (ctx,next)=>{
//     console.log(ctx.session)
//     if(ctx.path === '/favicon.ico') return 
//     let n = ctx.session.views || 0;
//     ctx.session.views = ++n;
//     // ctx.body = n + 'views';
//     next()
// })

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
    app.use(router.routes()).use(router.allowedMethods());
    // app.listen(8081);
    db.once('open', function() {
        app.listen(8081);
        console.log('服务器连接成功 at 8081');
    });
}

bootstrap(router);
