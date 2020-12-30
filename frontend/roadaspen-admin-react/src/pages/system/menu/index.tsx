import React, { useEffect } from 'react';
import { connect, ConnectProps, Dispatch } from 'umi';

interface Props extends ConnectProps{
    dispatch:Dispatch
}
const Menu: React.FC<Props> = (props) => {
    const {dispatch} = props;
    useEffect(() => {
        dispatch({
            type:'menu/getMenuList'
        })
    }, [])
    return <p>这是pages中的menu页面</p>
}
export default connect()(Menu)