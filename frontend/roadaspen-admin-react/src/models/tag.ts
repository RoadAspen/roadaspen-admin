/**
 * 当前用户已打开页面的信息
 */
import { Effect, Reducer } from 'umi';
import _ from 'lodash';

export type TagType = { path: string; title: string; del: boolean };
export type TagModelState = { tags: { [name: string]: TagType } };

export type TagModelType = {
	namespace: 'tag';
	state: TagModelState;
	effects: {
		addTag: Effect;
		removeTag: Effect;
	};
	reducers: {
		changeTag: Reducer<TagModelState>;
	};
};

const TagModel: TagModelType = {
	namespace: 'tag',
	state: {
		tags: {
			'/index': { path: '/index', title: '首页', del: false },
			'/system/menu': {
				path: '/system/menu',
				title: '菜单管理',
				del: true,
			},
		},
	},
	effects: {
		*addTag({ payload }, { put, select }) {
			// 新增tag，如果已存在，则不操作
			const newTagItem = payload as TagType;
			let { tags } = yield select(
				(state: { tag: TagModelState }) => state.tag,
			);
			tags = _.cloneDeep(tags);
			if (!tags[newTagItem.path] && newTagItem.path) {
				tags[newTagItem.path] = newTagItem;
				yield put({
					type: 'changeTag',
					payload: {
						tags,
					},
				});
			}
		},
		*removeTag({ payload }, { put, select }) {
			// 删除tag
			const removeTagItem = payload as TagType;
			let { tags } = yield select(
				(state: { tag: TagModelState }) => state.tag,
			);
			tags = _.cloneDeep(tags);
			if (tags[removeTagItem.path]) {
				delete tags[removeTagItem.path];
				yield put({
					type: 'changeTag',
					payload: {
						tags,
					},
				});
			}
		},
	},
	reducers: {
		changeTag(state, { payload }) {
			return {
				tags: payload.tags,
			};
		},
	},
};

export default TagModel;
