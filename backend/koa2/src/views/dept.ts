import { Dept } from "../models/dept";
import { ICtx } from "../interfaces";

// 获取部门列表
const getDeptList = async function (ctx: ICtx) {
  const dept_list = await Dept.find({});
  ctx.status = 200;
  ctx.body = { code: 200, data: dept_list, message: "操作成功" };
};

// 获取单个部门信息
const getDept = async function (ctx: ICtx) {
  const id = ctx.params.id;
  const dept = await Dept.findById(id); // 需要传入一个空对象作为默认值，或者直接传入对象作为新的Document
  ctx.status = 200;
  ctx.body = { code: 200, data: dept, message: "操作成功" };
};

// 新增部门
const addDept = async function (ctx: ICtx) {
  const deptEntity = new Dept(); // 需要传入一个空对象作为默认值，或者直接传入对象作为新的Document
  await deptEntity.save();
  const dept_list = await Dept.find({});
  // 通过status手动设置状态码
  ctx.status = 203;
  ctx.body = { data: dept_list };
};

// 编辑部门
const editDept = async function (ctx: ICtx) {
  const id = ctx.params.id;
  const dept = await Dept.find({ id: id }); // 需要传入一个空对象作为默认值，或者直接传入对象作为新的Document
  ctx.status = 200;
  ctx.body = { code: 200, data: dept, message: "操作成功" };
};

// 删除部门
const delDept = async function (ctx: ICtx) {
  const id = ctx.params.id;
  const dept = await Dept.findById(id); // 需要传入一个空对象作为默认值，或者直接传入对象作为新的Document
  if (dept) {
    await dept.remove();
  } else {
    ctx.body = { code: 200, message: "部门不存在" };
  }

  ctx.status = 200;
  ctx.body = { code: 200, data: dept, message: "操作成功" };
};

export default {
  "get /dept/list/": getDeptList,
  "get /dept/:id/": getDept,
  "post /dept/add/": addDept,
  "patch /dept/:id/": editDept,
  "delete /dept/:id/": delDept,
};
