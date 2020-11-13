import { Role, IRoleModel } from "../models/role.model";
import { ICtx } from "../interfaces/index.interface";


const getRole = async function(ctx: ICtx) {
	const Role_list = await Role.find({});
	ctx.body = {
		code: 200,
		msg: "查询成功",
		rows: Role_list,
		count:Role_list.length
	};
};

const addRole = async function(ctx: ICtx) {
	const body = ctx.request.body;
	const RoleEntity: IRoleModel = new Role({ name: 1 }); // 需要传入一个空对象作为默认值，或者直接传入对象作为新的Document
	const role =await RoleEntity.save();
	// 通过status手动设置状态码
	ctx.status = 203;
	ctx.body = { data: role };
};

const updateRole = async function(ctx: ICtx) {
	const body = ctx.request.body;
	const id = ctx.params.id;
	const Role_set: IRoleModel = Role.find({id:id}); // 返回
	const role =await Role_set.save();
	// 通过status手动设置状态码
	ctx.status = 203;
	ctx.body = { data: role };
};

export default {
	"get /system/role/list": getRole,
	"post /system/role/add": addRole,
	"delete /system/role/add": addRole,
	"post /system/role/:id/": updateRole,
};
