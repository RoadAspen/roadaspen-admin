import * as React from 'react';
import { Result, Button } from 'antd';
import { RouteComponentProps } from 'react-router';

// type Props = RouteComponentProps;

function Page404({ history }: RouteComponentProps): React.ReactElement {
    function goBack() {
        history.goBack();
    }
    return (
        <Result
            status='404'
            title='404'
            subTitle='未找到页面'
            extra={
                <Button type='primary' onClick={goBack}>
                    返回
                </Button>
            }
        />
    );
}

export default Page404;
