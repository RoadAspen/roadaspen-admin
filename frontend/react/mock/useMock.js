// eslint-disable-next-line @typescript-eslint/no-var-requires
const Mock = require('mockjs');

function useMock(app) {
    // pass
    app.get('/consumer/', function(req, res) {
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
}
module.exports = useMock;
