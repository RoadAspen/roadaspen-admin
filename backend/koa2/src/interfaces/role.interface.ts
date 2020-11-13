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
