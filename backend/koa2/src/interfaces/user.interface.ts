/**
 * 用户 types
 */

 export interface IUser{
	admin:boolean, // 是否是admin用户
    userName:string,// 用户名
    userId:string,// 用户id 默认唯一
    createBy:string, // 创建者
    createTime:string, // 创建时间
    email:string, // 邮箱
    loginDate:string, //登录时间
    loginIp:string, // 登录IP
    nickName:string, // 用户昵称
    phoneNumber:string,// 手机号 
    remark:string, // 备注
    roleIds:string,// 角色ID，逗号分隔
    roles:string[],// 角色id
    sex:string, // 性别
    status:string,// 账号状态 0 正常 || 1 停用
    description:string, // 角色描述
    order:number, // 显示顺序, 排序
    updateBy:string,// 更新者
    updateTime:string, // 更新时间
 }
