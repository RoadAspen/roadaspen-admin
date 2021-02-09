/**
 * 菜单
 */
import { Effect, Reducer } from 'umi';

import { get_menu_list } from '@/services/system/menu';

// 菜单
export type MenuType = {
	// 左侧菜单
	id?: string; // id
	key?: string; // 每个菜单key
	menuType?: string; // 菜单类型 directory 目录   menu 菜单  button 按钮
	menuName?: string; // 菜单名称
	menuOrder?: number; // 排序
	icon?: string; // 图标
	path?: string; // 路由地址
	component?: string; // 组件路径
	permissionCode?: string; // 权限编码
	children?: MenuType[]; // 子菜单
	isFrame?: boolean; // 是否外链
	isCache?: boolean; // 是否缓存
	parent?: string; // 父id
	show?: boolean; // 是否显示 true 显示  false 隐藏
	status?: 1 | 0; // 菜单状态 1正常 0 停用
	createTime?: string; // 创建时间
	updateTime?: string; // 更新时间
};
interface FieldData {
	name: string | number | (string | number)[];
	value?: any;
	touched?: boolean;
	validating?: boolean;
	errors?: string[];
}
export interface MenuModelState {
	menuList: MenuType[]; //
	formLoading: boolean; //
	queryParams: {
		menuName: string | undefined;
		status: number | undefined;
	};
	formData: FieldData[];
	visible: false;
	title: string;
	ids: [];
	type: string; // add | edit
}

export interface MenuModelType {
	namespace: 'menu';
	state: MenuModelState;
	effects: {
		getMenuList: Effect;
		addMenu: Effect;
	};
	reducers: {
		update: Reducer<MenuModelState>;
	};
}

const MenuModel: MenuModelType = {
	namespace: 'menu',
	state: {
		// 菜单列表
		menuList: [],
		// 表单新增、修改 是否正在请求中
		formLoading: false,
		// 查询参数
		queryParams: {
			menuName: undefined,
			status: undefined,
		},
		// 表单参数
		formData: [
			{ name: ['parent'], value: '1' },
			{ name: ['menuType'], value: 2 },
			{ name: ['icon'], value: '' },
			{ name: ['menuName'], value: '' },
			{ name: ['menuOrder'], value: 1 },
			{ name: ['isFrame'], value: true },
			{ name: ['path'], value: '' },
			{ name: ['component'], value: '' },
			{ name: ['permissionCode'], value: '' },
			{ name: ['show'], value: true },
			{ name: ['status'], value: 1 },
			{ name: ['isCache'], value: true },
		],
		// 是否显示弹出层
		visible: false,
		// 弹出层标题
		title: '',
		// 弹窗当前类型
		type: '',
		// 选择的id
		ids: [],
	},
	effects: {
		*getMenuList(_, { call, put }) {
			const response = yield call(get_menu_list);
			// 请求用户信息成功，存储用户信息，并将fetchUserInfo标识为true
			yield put({
				type: 'update',
				payload: {
					menu_list: response.data,
				},
			});
		},
		addMenu(state, { payload }) {
			return {
				...state,
				menu_list: payload.data || [],
			};
		},
	},
	reducers: {
		update(state, { payload }) {
			return {
				...state,
				...payload,
			};
		},
	},
};

export default MenuModel;
