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
