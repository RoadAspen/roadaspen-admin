import { Menu, IMenuModel } from "../models/menu";
import { ICtx } from "../interfaces";

// get list
const getMenulist = async function (ctx:ICtx) {
	const Menu_list = await Menu.find({});
	ctx.response.body = {
		name: 1,
		age: 34,
		data: Menu_list,
	};
};

// 添加
const addMenu = async function (ctx:ICtx) {
	const body = ctx.request.body;
	console.log(body);
	const MenuEntity: IMenuModel = new Menu({ name: 1 }); // 需要传入一个空对象作为默认值，或者直接传入对象作为新的Document
	await MenuEntity.save;
	const Menu_list = await Menu.find({});
	// 通过status手动设置状态码
	ctx.status = 203;
	ctx.body = { data: Menu_list };
};

// 更新
const updateMenu = async function (ctx:ICtx) {
	const body = ctx.request.body;
	console.log(body);
	const MenuEntity: IMenuModel = new Menu({ name: 1 }); // 需要传入一个空对象作为默认值，或者直接传入对象作为新的Document
	await MenuEntity.save;
	const Menu_list = await Menu.find({});
	// 通过status手动设置状态码
	ctx.status = 203;
	ctx.body = { data: Menu_list };
};

export default {
	"get /menu/list": getMenulist,
	"post /menu/add": addMenu,
	"post /menu/:id/update": updateMenu,
};
