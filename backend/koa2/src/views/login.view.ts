// 登录
import { ICtx } from "../interfaces/interface";
import code from 'svg-captcha';
import md5 from 'md5';

code.options.width = 200;
code.options.height = 200;
code.options.fontSize = 12;

function createCode() {
    // 返回数学算式
    return code.createMathExpr({
        width: 100,
        height: 40,
        fontSize: 50,
        // size:4, //随机字符串的多少
        ignoreChars: '0o1iIl',//过滤掉一些字符，例如0o1i
        noise: 3, //噪声线数
        background: '#eee',// SVG图片的背景颜色
        color: true, //字符将具有不同的颜色而不是灰色，如果设置了背景选项，则为true
        mathMin: 1, //数学表达式可以为的最小值
        mathMax: 9, //数学表达式可以为的最大值
        mathOperator: '-', //要使用+，-或的运算符+-（对于random +或-）
    })
}

const login = async function(ctx: ICtx) {
    console.log(ctx)
    const body = ctx.request.body;
    // if(ctx.session,usr){
    //     ctx.body = { data: {a:`1`,code:createCode()} };
    // }else{

    // }
    ctx.body = { a: 1 }
};

const captchaImage = async function(ctx: ICtx) {
    const { text, data } = createCode();
    console.log(text)

    ctx.body = {
        code: 200,
        statusText: 'OK',
        data: {
            data: data,
            uuid: md5('message')
        }
    };
}
// heihei 
export default {
    "post /login": login,
    "get /captchaImage": captchaImage
};