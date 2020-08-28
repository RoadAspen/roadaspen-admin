/**
 * main 中的 page router所处的位置
 */
import React, { ReactElement } from 'react';
import * as mainStyle from '@/assets/css/main/main.scss';
interface Props {
    children: React.ReactNode;
}
function Page(props: Props): ReactElement {
    return (
        <div className={mainStyle.page}>
            <div className={mainStyle.pageContent}>{props.children}</div>
        </div>
    );
}

export default Page;
