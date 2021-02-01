/**
 * HOC 路由组件添加权限验证
 */
import React from "react";
import { Redirect, connect } from 'umi';
let isLogin = true;
// 权限及角色验证， 先验证角色，再验证权限

const RouteComponentAuth: React.FC = (props)=> {
  // const {isLogin} = useAuth();
  // isLogin = !isLogin;
  if (isLogin) {
    console.log("已经登录");
    return <div title={'jd'}>{props.children}</div>;
  } else {
    console.log("未登录");
    return <Redirect to="/login" />;
  }
}
export default connect()(RouteComponentAuth)