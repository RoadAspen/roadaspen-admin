import { User, IUserModel } from "../models/user";
import { ICtx } from "../interfaces";
import { verify_token } from "../utils";

// 获取当前user信息
const getCurrentUserInfo = async function (ctx: ICtx) {
  const tokens = ctx.request.headers.authorization;
  const token = tokens.split(" ")[1];
  const data = await verify_token(token);
  ctx.body = {
    code: data.code,
    data: {
      user: data.data,
    },
    message: data.message,
  };
};

// 获取user列表
const getUserList = async function (ctx: ICtx) {
  const user_list = await User.find();
  ctx.status = 200;
  ctx.body = { code:200,data:user_list,message:'操作成功'};
};

// 获取单个user信息
const getUser = async function (ctx: ICtx) {
  const id = ctx.params.id;
  const user = await User.find({id:id});; // 需要传入一个空对象作为默认值，或者直接传入对象作为新的Document
  ctx.status = 200;
  ctx.body = { code:200,data:user,message:'操作成功'};
};
// 新增用户
const addUser = async function (ctx: ICtx) {
  const userEntity = new User(); // 需要传入一个空对象作为默认值，或者直接传入对象作为新的Document
  await userEntity.save();
  const user_list = await User.find({});
  // 通过status手动设置状态码
  ctx.status = 203;
  ctx.body = { data: user_list };
};

// 编辑用户
const editUser = async function (ctx: ICtx) {
  const id = ctx.params.id;
  const user = await User.findById(id);; // 需要传入一个空对象作为默认值，或者直接传入对象作为新的Document
  ctx.status = 200;
  ctx.body = { code:200,data:user,message:'操作成功'};
};

// 删除用户
const delUser = async function (ctx: ICtx) {
  const id = ctx.params.id;
  const user = await User.findById(id);; // 需要传入一个空对象作为默认值，或者直接传入对象作为新的Document
  if(user){
    await user.remove();
  }else{
    ctx.body = { code:200,message:'用户不存在'};
  }
  ctx.body = { code:200,data:user,message:'操作成功'};
  ctx.status = 200;
};

export default {
  "get /user/current/info/": getCurrentUserInfo,
  "get /user/list/": getUserList,
  "get /user/:id/": getUser,
  "post /user/add/": addUser,
  "patch /user/:id/": editUser,
  "delete /user/:id/": delUser,
};
