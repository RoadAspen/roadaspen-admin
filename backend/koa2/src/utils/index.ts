/**
 *
 */
import jwt from "jsonwebtoken";
import { app_secret_key } from "../config";
import { IUserModel, User } from "../models/user";

// 生成token 默认使用 {algorithm:'HS256'} 加密
export function create_token(payload: { username?: string }) {
  // 过期时间
  return jwt.sign(payload, app_secret_key, { expiresIn: 60 * 60 });
}

// 验证token
export function verify_token(
  token: string
): Promise<{
  code: number;
  data: string | IUserModel;
  msg: string;
}> {
  return new Promise((resolve) => {
    jwt.verify(token, app_secret_key, (error, decoded) => {
      if (error) {
        // token过期或者报错
        resolve({ code: 401, data: "", msg: error.message });
      } else {
        // 如果存在，则去解析token
        if (decoded) {
          const { username } = decoded as {
            username: string;
          };
          User.findOne({ userName: username },{password: 0 }, (error, user) => {
            if (!user) {
              resolve({ code: 401, data: "", msg: "用户不存在" });
            } else {
              resolve({ code: 200, data: user, msg: "合法的token" });
            }
          });
        } else {
          resolve({ code: 401, data: "", msg: "用户不存在" });
        }
      }
    });
  });
}
