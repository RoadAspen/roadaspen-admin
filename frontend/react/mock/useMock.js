// eslint-disable-next-line @typescript-eslint/no-var-requires
const Mock = require('mockjs');
const code = require('svg-captcha');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
// 创建验证码
function createCode() {
    // 返回数学算式
    return code.createMathExpr({
        width: 100,
        height: 40,
        fontSize: 50,
        // size:4, //随机字符串的多少
        ignoreChars: '0o1iIl', //过滤掉一些字符，例如0o1i
        noise: 0, //噪声线数
        background: '#eee', // SVG图片的背景颜色
        color: false, //字符将具有不同的颜色而不是灰色，如果设置了背景选项，则为true
        mathMin: 1, //数学表达式可以为的最小值
        mathMax: 9, //数学表达式可以为的最大值
        mathOperator: '+', //要使用+，-或的运算符+-（对于random +或-）
    });
}

function useMock(app) {
    // pass
    app.get('/api/user/', function(req, res) {
        const data = Mock.mock({
            total: 40,
            'results|10': [
                {
                    'id|+1': 1,
                    username: '@first()' + '@123456',
                    'role|1': ['报表维护', '战略数据维护', '营销数据维护'],
                    role_des: '@word(4,10)',
                    creaded_at: '@datetime(yyyy-MM-dd HH:mm:ss)',
                    updated_at: '@datetime(yyyy-MM-dd HH:mm:ss)',
                    failured_at: '@datetime(yyyy-MM-dd HH:mm:ss)',
                    'status|1': ['失效', '启用'],
                },
            ],
        });
        res.status(200).send(data);
    });

    app.get('/api/captchaImage/', (req, res) => {
        const { text, data } = createCode();

        res.status(200).send({
            code: 200,
            statusText: 'OK',
            data: {
                data: data,
                uuid: md5('message'),
            },
        });
    });
    app.post('/api/login/', (req, res) => {
        const token = jwt.sign({ username: 'username' }, 'ssssss', { algorithm: 'HS256' });
        res.status(200).send({
            code: 200,
            token: token,
        });
    });
}
module.exports = useMock;
