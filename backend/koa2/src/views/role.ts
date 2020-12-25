import { Role, IRoleModel } from "../models/role";
import { ICtx } from "../interfaces";

// 获取角色列表
const getRoleList = async function (ctx: ICtx) {
	const role_list = await Role.find({});
	ctx.status = 200;
	ctx.body = { code: 200, data: role_list, message: "操作成功" };
  };
  
  // 获取单个角色信息
  const getRole = async function (ctx: ICtx) {
	const id = ctx.params.id;
	const role = await Role.findById(id); // 需要传入一个空对象作为默认值，或者直接传入对象作为新的Document
	ctx.status = 200;
	ctx.body = { code: 200, data: role, message: "操作成功" };
  };
  // 新增角色
  const addRole = async function (ctx: ICtx) {
	const roleEntity = new Role(); // 需要传入一个空对象作为默认值，或者直接传入对象作为新的Document
	await roleEntity.save();
	const role_list = await Role.find({});
	// 通过status手动设置状态码
	ctx.status = 203;
	ctx.body = { data: role_list };
  };
  
  // 编辑角色
  const editRole = async function (ctx: ICtx) {
	const id = ctx.params.id;
	const role = await Role.find({ id: id }); // 需要传入一个空对象作为默认值，或者直接传入对象作为新的Document
	ctx.status = 200;
	ctx.body = { code: 200, data: role, message: "操作成功" };
  };
  
  // 删除角色
  const delRole = async function (ctx: ICtx) {
	const id = ctx.params.id;
	const role = await Role.findById(id); // 需要传入一个空对象作为默认值，或者直接传入对象作为新的Document
	if (role) {
	  await role.remove();
	} else {
	  ctx.body = { code: 200,  message: "角色不存在" };
	}
	ctx.status = 200;
	ctx.body = { code: 200, data: role, message: "操作成功" };
  };
  
  export default {
	"get /role/list/": getRoleList,
	"get /role/:id/": getRole,
	"post /role/add/": addRole,
	"patch /role/:id/": editRole,
	"delete /role/:id/": delRole,
  };