import React, { ReactElement } from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import * as mainStyle from '@/assets/css/main/main.scss';

interface Props {
    onClick(): void;
    collapsed: boolean;
}

function Header(props: Props): ReactElement {
    return (
        <header className={mainStyle.headerBox}>
            {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                onClick: props.onClick,
                className: mainStyle.trigger,
            })}
        </header>
    );
}

export default Header;
