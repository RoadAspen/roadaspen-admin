import React, { ReactElement } from 'react';
import * as mainStyle from '@/assets/css/main/main.scss';
// import logoJpg from '@/assets/images/2.png';
interface Props {
    collapsed: boolean;
}
export default function Logo(props: Props): ReactElement {
    return (
        <div className={mainStyle.logo}>
            {/* <img src={props.collapsed ? logoJpg : logoJpg} alt='' /> */}
            <p style={{ textAlign: 'center', color: '#ffffff' }}>
                {props.collapsed ? 'LOGO' : 'BIG LOGO ! YEAR'}
            </p>
        </div>
    );
}
