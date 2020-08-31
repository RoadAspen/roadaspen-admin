import { Student, IStudentModel } from "../models/student.model";
import { ICtx } from "../interfaces/interface";


const getStudent = async function(ctx: ICtx) {
	const student_list = await Student.find({});
	ctx.response.body = {
		name: 1,
		age: 34,
		data: student_list,
	};
};

const postStudent = async function(ctx: ICtx) {
	const body = ctx.request.body;
	const studentEntity: IStudentModel = new Student({ name: 1 }); // 需要传入一个空对象作为默认值，或者直接传入对象作为新的Document
	await studentEntity.save();
	const student_list = await Student.find({});
	// 通过status手动设置状态码
	ctx.status = 203;
	ctx.body = { data: student_list };
};

export default {
	"get /student/list": getStudent,
	"post /student/add": postStudent,
};
