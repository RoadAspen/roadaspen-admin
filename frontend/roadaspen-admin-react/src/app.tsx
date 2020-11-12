import { history } from 'umi';
export function render(oldRender) {
    // 在 真正的render之前，执行自定义的操作逻辑
    console.log('先执行这里，然后执行 ReactDOM.render');
    oldRender() 
}

export function onRouteChange({ location, routes, action }) {
    //bacon(location.pathname);
    // 路由切换时执行
  }