import { Menu, IMenuModel } from "../models/menu";
import { ICtx } from "../interfaces";

// 获取menu列表
const getMenuList = async function (ctx: ICtx) {
  const menu_list = await Menu.find({});
  ctx.status = 200;
  ctx.body = { code: 200, data: menu_list, message: "操作成功" };
};

// 获取单个menu信息
const getMenu = async function (ctx: ICtx) {
  const id = ctx.params.id;
  const menu = await Menu.find({ id: id }); // 需要传入一个空对象作为默认值，或者直接传入对象作为新的Document
  ctx.status = 200;
  ctx.body = { code: 200, data: menu, message: "操作成功" };
};
// 新增菜单
const addMenu = async function (ctx: ICtx) {
  const menuEntity = new Menu(); // 需要传入一个空对象作为默认值，或者直接传入对象作为新的Document
  await menuEntity.save();
  const menu_list = await Menu.find({});
  // 通过status手动设置状态码
  ctx.status = 203;
  ctx.body = { data: menu_list };
};

// 编辑菜单
const editMenu = async function (ctx: ICtx) {
  const id = ctx.params.id;
  const menu = await Menu.find({ id: id }); // 需要传入一个空对象作为默认值，或者直接传入对象作为新的Document
  ctx.status = 200;
  ctx.body = { code: 200, data: menu, message: "操作成功" };
};

// 删除菜单
const delMenu = async function (ctx: ICtx) {
  const id = ctx.params.id;
  const menu = await Menu.findById(id); // 需要传入一个空对象作为默认值，或者直接传入对象作为新的Document
  if (menu) {
    await menu.remove();
  } else {
    ctx.body = { code: 200,  message: "菜单不存在" };
  }

  ctx.status = 200;
  ctx.body = { code: 200, data: menu, message: "操作成功" };

};

export default {
  "get /menu/list/": getMenuList,
  "get /menu/:id/": getMenu,
  "post /menu/add/": addMenu,
  "patch /menu/:id/": editMenu,
  "delete /menu/:id/": delMenu,
};
