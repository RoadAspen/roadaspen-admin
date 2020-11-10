import React from 'react';
import { history } from 'umi';

// 当 app 首次渲染时
export function render(oldRender) {
    // fetch('/api/auth').then(auth => {
    //     if (auth.isLogin) {
    //         oldRender()
    //     }
    //     else {
    //         history.push('/login');
    //         oldRender()
    //     }
    // });
    console.log('首次渲染');
}

export function onRouteChange(props) {
    console.log(props);
}