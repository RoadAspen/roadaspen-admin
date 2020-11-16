/**
 * 用户 types
 */

export interface IUser {
  admin: boolean; // 是否是admin用户
  userName: string; // 用户名
  userId: string; // 用户id 默认唯一
  createBy: string; // 创建者
  createTime: string; // 创建时间
  updateBy: string; // 更新者
  updateTime: string; // 更新时间
  email: string; // 邮箱
  loginDate: string; //登录时间
  loginIp: string; // 登录IP
  nickName: string; // 用户昵称
  phoneNumber: string; // 手机号
  remark: string; // 备注
  roleIds: string; // 角色ID，逗号分隔
  roles: string[]; // 角色id
  sex: string; // 性别
  status: string; // 账号状态 0 正常 || 1 停用
  description: string; // 角色描述
  order: number; // 显示顺序, 排序
}

/**
 * 角色 信息类型 types
 */
export interface IRole {
  admin: boolean; // 是否为 admin 角色
  createBy: string | null; // 创建者
  createTime: string | null; // 创建时间
  deptCheckStrictly: false; // 部门
  deptIds: string | null; // 部门ID
  menuIds: string[]; // 菜单id数组
  remark: string | null; // 角色备注
  roleId: string; // 角色id
  roleCode: string; // 角色编码
  roleName: string; // 角色名称
  roleSort: number; // 角色排序
  status: 0 | 1; // 状态 0 未启用 1 启用
  updateBy: string | null; // 更新者
  updateTime: string | null; //更新时间
}

/**
 * 菜单
 */
export interface IMenu {
  children: [];
  component: string; // 组件路径
  createBy: string | null; // 创建者id
  createTime: string | null; //创建时间
  icon: string | null; // 图标
  isCache: boolean; // 是否缓存
  isFrame: boolean; // 是否外链
  menuId: number; // 菜单id
  menuName: string; // 菜单名称
  menuType: string; // 菜单类型
  orderNum: number; // 显示排序
  parentId: number | null; // 父id
  parentName: string | null; // 父菜单名称
  path: "";
  perms: string; // 权限编码
  remark: string | null; // 备注
  status: 0 | 1; // 状态 0 停用 1 正常
  updateBy: string | null; // 更新者
  updateTime: string | null; // 更新时间
}

/**
 * 部门 类型
 */

export type IDept = {
  dept_id: number; // '部门id',
  parent_id: number; // '父部门id',
  ancestors: string; // '祖级列表',
  dept_name: string; // '部门名称',
  order_num: string; // '显示顺序',
  leader: string; // '负责人',
  phone: string; // '联系电话',
  email: string; // '邮箱',
  status: string; // '部门状态（0正常 1停用）',
  del_flag: string; // '删除标志（0代表存在 2代表删除）',
  create_by: string; // '创建者',
  create_time: string; // '创建时间',
  update_by: string; // '更新者',
  update_time: string; // '更新时间',
};

/**
 * 字典表
 */
