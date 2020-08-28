import { Teacher, ITeacherModel } from "../models/teacher.model";
import { ICtx } from "../interfaces/interface";


const getTeacher = async function (ctx:ICtx) {
	const teacher_list = await Teacher.find({});
	ctx.response.body = {
		name: 1,
		age: 34,
		data: teacher_list,
	};
};

const postTeacher = async function (ctx:ICtx) {
	const body = ctx.request.body;
	console.log(body);
	const teacherEntity: ITeacherModel = new Teacher({ name: 1 }); // 需要传入一个空对象作为默认值，或者直接传入对象作为新的Document
	await teacherEntity.save;
	const teacher_list = await Teacher.find({});
	// 通过status手动设置状态码
	ctx.status = 203;
	ctx.body = { data: teacher_list };
};

export default {
	"get /teacher/": getTeacher,
	"post /teacher/": postTeacher,
};
