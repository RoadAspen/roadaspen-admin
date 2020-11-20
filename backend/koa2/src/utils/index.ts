/**
 * 
 */
import jwt from "jsonwebtoken";
import { app_secret_key } from "../config";
import { User } from "../models/user";

// 生成token 默认使用 {algorithm:'HS256'} 加密
export function create_token(payload: { username: string,expire_time:number }) {
  const expiresIn = Date.now() + 3600000 * 24; // 过期时间 24小时后
  return jwt.sign(payload, app_secret_key, { expiresIn: expiresIn });
}

// 验证token
export function verify_token(token: string) {
  return new Promise((resolve) => {
    jwt.verify(token, app_secret_key, (error, decoded) => {
      if (error) {
        resolve(false);
      } else {
        // 如果存在，则去解析token
        if(decoded){
          const {username,expire_time} = decoded as { username: string,expire_time:number };
          if(expire_time < (new Date()).getTime()){
            resolve(false);
          }else{
            const user = User.find({userName:username})
            if(!user){
              resolve(false);
            }else{
              resolve(true)
            }
          }
        }else{
          resolve(false);
        }
      }
    });
  });
}