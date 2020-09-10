import { Permission, IPermissionModel } from "../models/permission.model";
import { ICtx } from "../interfaces/role.interface";


const getPermission = async function (ctx:ICtx) {
	const Permission_list = await Permission.find({});
	ctx.response.body = {
		name: 1,
		age: 34,
		data: Permission_list,
	};
};

const addPermission = async function (ctx:ICtx) {
	const body = ctx.request.body;
	console.log(body);
	const PermissionEntity: IPermissionModel = new Permission({ name: 1 }); // 需要传入一个空对象作为默认值，或者直接传入对象作为新的Document
	await PermissionEntity.save;
	const Permission_list = await Permission.find({});
	// 通过status手动设置状态码
	ctx.status = 203;
	ctx.body = { data: Permission_list };
};

export default {
	"get /Permission/list": getPermission,
	"post /Permission/add": addPermission,
};
