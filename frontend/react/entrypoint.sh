#! /bin/bash
# 这里主要做的是给 nginx 的 proxy_pass 配置 ，通过环境变量传入，这里通过拿到环境变量，然后替换文件
# 由于 代理地址中 存在 / ，所以我们这里使用 % 做为分割符
# 由于我们这里需要 对url重写，所以传入的 PROXY_PORT 链接必须以 / 结尾

sed -i 's%PROXY_PORT%'${PROXY_PORT}'%' /etc/nginx/nginx.conf

# 手动启动 nginx
nginx -g "daemon off;"