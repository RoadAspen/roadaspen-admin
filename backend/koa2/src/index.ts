import Koa from 'koa';
import path from 'path';
import bodyparser from 'koa-bodyparser';
import statics from 'koa-static';
import Router from 'koa-router';
import { loadModules } from './loadModules';
import mongo from './mongo';

const app = new Koa();

// body解析
app.use(bodyparser());

// 静态资源解析
app.use(statics(path.join(__dirname, 'static')));

// 获取 views 文件夹下所有的文件，然后获取每个文件名，根据文件名添加router方法
const router = new Router();

app.use(async (ctx,next)=>{
    if(ctx.path === '/favicon.ico') return 
    console.log(ctx.path)
    if(ctx.path === '/name'){
        ctx.body = {
            code:403,
            data:'',
            msg:"无权限"
        }
        return 
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
