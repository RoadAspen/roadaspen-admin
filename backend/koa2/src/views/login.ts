// 登录
import { ICtx } from "../interfaces";
import svgCaptcha from "svg-captcha";
import md5 from "md5";
import redis from "../redis";
import { create_token } from "../utils";
import { User } from "../models/user";

svgCaptcha.options.width = 200;
svgCaptcha.options.height = 200;
svgCaptcha.options.fontSize = 12;

// 创建验证码
function createCode() {
  // 返回数学算式
  return svgCaptcha.createMathExpr({
    width: 100,
    height: 40,
    fontSize: 50,
    ignoreChars: "0o1iIl", //过滤掉一些字符，例如0o1i
    noise: 0, //噪声线数
    background: "#eee", // SVG图片的背景颜色
    color: true, //字符将具有不同的颜色而不是灰色，如果设置了背景选项，则为true
    mathMin: 1, //数学表达式可以为的最小值
    mathMax: 9, //数学表达式可以为的最大值
    mathOperator: "+", //要使用+，-或的运算符+-（对于random +或-）
  });
}

// 登录
const login = async function (ctx: ICtx) {
  // 获取前端传值
  const { username, password, uuid, code } = ctx.request.body;
  ctx.status = 200;
  let codes;
  if (uuid) {
    codes = await redis.get(uuid);
    if (codes === null) {
      ctx.body = {
        code: 404,
        msg: "验证码已过期",
      };
      return;
    }
  } else {
    ctx.body = {
      code: 404,
      msg: "请输入uuid",
    };
    return;
  }

  if (codes === code) {
    // 验证码正确
    const psmd5 = md5(password);

    const user = await User.findOne({userName:username,password:psmd5});
    // 如果账号密码正确，则返回 token,
    if (user) {
      const token = create_token({
        username: username
      });
      ctx.body = {
        code: 200,
        msg: "登录成功",
        data: {
          token,
        },
      };
    } else {
      ctx.body = {
        code: 404,
        msg: "账户或密码错误",
      };
    }
  } else {
    // 验证码错误
    ctx.body = { code: 404, msg: "验证码错误" };
  }
};

// 获取验证码
const captchaImage = async function (ctx: ICtx) {
  // 生成验证码
  const { text, data } = createCode();
  const uuid = md5(`${new Date().getTime()}`);
  // 设置过期时间,1000s， 单位是 秒
  await redis.set(uuid, text, "ex", 1000);
  ctx.body = {
    code: 200,
    msg: "操作成功",
    data: {
      img: data,
      uuid: uuid,
    },
  };
};
// heihei
export default {
  "post /login/": login,
  "get /captchaImage/": captchaImage,
};
