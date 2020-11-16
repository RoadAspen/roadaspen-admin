import { mongo_db_conf} from "./config";
import mongoose from "mongoose";
mongoose.connect(mongo_db_conf.db_url, {
    useNewUrlParser: true, // 使用新版的url解析
    useUnifiedTopology: true, // 
    keepAlive:true, // 是否保持连接
});

const mongo = mongoose.connection;

mongo.on("error", console.error.bind(console, "MongoDB 连接错误："));
mongo.on('connected', function() {
    console.log('Mongoose 连接到数据库');
}) 

export default mongo;