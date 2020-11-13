import md5 from "md5";
import jwt from "jsonwebtoken";
import { app_secret_key } from "../config";

// 生成token 默认使用 {algorithm:'HS256'} 加密
export function create_token(payload: { username: string }) {
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
        resolve(decoded);
      }
    });
  });
}
