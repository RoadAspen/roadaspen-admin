/**
 * 批量导入view文件
 */
import path from "path";
import fs from "fs";
import { ParameterizedContext } from "koa";
import { IRouterParamContext } from 'koa-router';
export async function loadModules(dir_path: string) {
	// 读取路径文件夹下的目录
	let files = await fs.promises.readdir(dir_path);
	// 根据文件目录 导入文件
	const router_list: Array<{
		methods: string;
		url: string;
		func: (ctx: ParameterizedContext<any, IRouterParamContext<any, {}>>) => undefined;
	}> = [];
	// 使用promise.all 在所有文件执行之后返回一个数组
	const imports = await Promise.all(
		files.map(async (file) => {
			const a: { default: { [key: string]: (ctx: ParameterizedContext<any, IRouterParamContext<any, {}>>) => undefined } } = await import(
				path.join(dir_path, file)
			);
			return a.default;
		})
	);
	// 根据返回的值，解析成 方法、路径、函数 的方式。
	for (const item of imports) {
		Object.keys(item).forEach((key) => {
			const arr = key.split(" ");
			router_list.push({
				methods: arr[0],
				url: arr[1],
				func: item[key],
			});
		});
	}
	return router_list;
}
