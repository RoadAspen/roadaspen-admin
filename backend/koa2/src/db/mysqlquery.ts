/**
 * 定义mysql
 */
import mysql from "mysql";
import { mysql_db_conf } from "./config";

class MyPool {
	flag: boolean;
	pool: any;
	constructor() {
		this.flag = true;
		this.pool = mysql.createPool(mysql_db_conf);
	}
	getPool() {
		const that = this;
		if (that.flag) {
			// 如果未连接，则需要知道是否连接成功
			that.pool.on("connection", function () {
				console.log("连接成功了");
				that.flag = false;
			});
		}
		return this.pool;
	}
}

const myPool = new MyPool().getPool();

const query = function (sql: string, args?: string[]): Promise<Array<any>> {
	// 根据 sql语句，使用Promise包裹返回的值
	return new Promise((resolve, reject) => {
		try {
			myPool.query(sql, args, function (err: string, rows: any) {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			});
		} catch (error) {
			reject(error);
		}
	});
};
export default query;
