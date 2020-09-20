import mongoose from "mongoose";
import { mongo_db_conf } from "./db_conf";

mongoose.connect(mongo_db_conf.db_url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	keepAlive:true
});
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB 连接错误："));

export default db;
