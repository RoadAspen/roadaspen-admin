import mongoose from "mongoose";
import { mongo_db_conf } from "./config";

mongoose.connect(mongo_db_conf.db_url, {
	useNewUrlParser: true, // 使用新版的url解析
	useUnifiedTopology: true, // 
	keepAlive:true, // 是否保持连接
});
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB 连接错误："));

export default db;
