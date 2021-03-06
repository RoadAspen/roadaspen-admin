import { routerRedux } from 'dva/router';
import { stringify, parse } from 'qs';
import { Effect, Reducer } from 'umi';

export function getPageQuery() {
	// 获取 url上的 query search属性
	return parse(window.location.href.split('?')[1]);
}

// model type
export interface ModelType {
	namespace: string;
	state: {};
	effects: {
		logout: Effect;
	};
	reducers: {
		changeLoginStatus: Reducer<{}>;
	};
}

const Model: ModelType = {
	namespace: 'login',

	state: {
		status: undefined,
	},

	effects: {
		*logout(_, { put }) {
			const { redirect } = getPageQuery();
			// redirect
			if (window.location.pathname !== '/login' && !redirect) {
				// 如果
				yield put(
					routerRedux.replace({
						pathname: '/login',
						search: stringify({
							redirect: window.location.href,
						}),
					}),
				);
			}
		},
	},

	reducers: {
		changeLoginStatus(state, { payload }) {
			return {
				...state,
				status: payload.status,
				type: payload.type,
			};
		},
	},
};

export default Model;
