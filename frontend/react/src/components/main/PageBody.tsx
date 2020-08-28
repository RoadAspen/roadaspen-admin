import React, { ReactElement } from 'react';
import * as mainStyle from '@/assets/css/main/main.scss';
interface Props {
    children: React.ReactNode;
}

function PageBody(props: Props): ReactElement {
    return <div className={mainStyle.pageBody}>{props.children}</div>;
}

export default PageBody;
