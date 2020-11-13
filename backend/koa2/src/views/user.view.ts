import { User, IUserModel } from "../models/user.model";
import { ICtx } from "../interfaces/index.interface";

// 获取user列表
const getUser = async function (ctx:ICtx) {
	const user_list = await User.find({});
	ctx.response.body = {
		data: user_list,
	};
};

// 新增用户
const registerUser = async function (ctx:ICtx) {
	const body = ctx.request.body;
	const userEntity: IUserModel = new User(); // 需要传入一个空对象作为默认值，或者直接传入对象作为新的Document
	await userEntity.save();
	const user_list = await User.find({});
	// 通过status手动设置状态码
	ctx.status = 203;
	ctx.body = { data: user_list };
};

export default {
	"get /user/list": getUser,
	"post /register/": registerUser,
};
