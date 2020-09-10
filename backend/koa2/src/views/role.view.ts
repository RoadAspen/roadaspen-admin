import { Role, IRoleModel } from "../models/role.model";
import { ICtx } from "../interfaces/role.interface";


const getRole = async function(ctx: ICtx) {
	const Role_list = await Role.find({});
	ctx.response.body = {
		name: 1,
		age: 34,
		data: Role_list,
	};
};

const addRole = async function(ctx: ICtx) {
	const body = ctx.request.body;
	const RoleEntity: IRoleModel = new Role({ name: 1 }); // 需要传入一个空对象作为默认值，或者直接传入对象作为新的Document
	await RoleEntity.save();
	const Role_list = await Role.find({});
	// 通过status手动设置状态码
	ctx.status = 203;
	ctx.body = { data: Role_list };
};

export default {
	"get /role/list": getRole,
	"post /role/add": addRole,
};
