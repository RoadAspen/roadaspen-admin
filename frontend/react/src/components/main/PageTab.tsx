/**
 * page 展示 title
 */

import React from 'react';
import * as mainStyle from '@/assets/css/main/main.scss';

interface Props {
    title: string;
}

export default function FixedTab(props: Props) {
    return (
        <ul className={mainStyle.pageTab}>
            <li>
                <p>{props.title}</p>
            </li>
        </ul>
    );
}
