import Koa from 'koa';
import path from 'path';
import bodyparser from 'koa-bodyparser';
import statics from 'koa-static';
import Router from 'koa-router';
import { loadModules } from './loadModules';
import mongo from './mongo';
import { write_list } from './config';
import { verify_token } from './utils';

const app = new Koa();

// body解析
app.use(bodyparser());

// 静态资源解析
app.use(statics(path.join(__dirname, 'static')));

// 获取 views 文件夹下所有的文件，然后获取每个文件名，根据文件名添加router方法
const router = new Router();

app.use(async (ctx,next)=>{
    if(ctx.path === '/favicon.ico'){
        return
    }
    // 如果路径不在白名单，则需要验证token
    if(!write_list.includes(ctx.path)){
        const tokens = ctx.request.headers.authorization;
        const token = tokens && tokens.split(" ")[1];
        const data = await verify_token(token);
        if(data.code!==200){
            ctx.body = data
        }else{
            ctx.userid = data.data && data.data.id 
        }
    }
    await next();
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
   
    mongo.once('open', function() {
        app.listen(8081);
        console.log('服务器启动成功 at 8081');
    });
}

bootstrap(router);
