import React, { ReactElement } from 'react';

import * as mainStyle from '@/assets/css/main/main.scss';
interface Props {
    children: React.ReactNode;
}
function Content(props: Props): ReactElement {
    return <div className={mainStyle.content}>{props.children}</div>;
}

export default Content;
