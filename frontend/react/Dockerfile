# 分阶段构建

# ==================== 第一阶段 =======================

# 指定基础镜像
FROM node:lts as frontend

# 设置工作目录
WORKDIR /workspace

# 将package.json 拷贝进工作目录
COPY package.json /workspace

# 将 yarn.lock 拷贝进工作目录
COPY yarn.lock  /workspace

# 1、安装 yarn ，2 设置 yarn 的 源为淘宝源
RUN npm install -g yarn  && yarn config set registry https://registry.npm.taobao.org

# 拉取依赖
RUN yarn

# 将除了.dockerignore中的指定文件外的 打包所需的文件全部拷贝进工作目录
COPY . /workspace

# 打包, 生成 dist 文件夹，包含所有打包后的资源  html css js img iconfont 等
RUN yarn build


# ================== 第二阶段 =======================

# 指定基础镜像
FROM nginx:latest as nginx

# 将 copy 静态文件到 nginx 的 静态文件夹中
COPY --from=frontend /workspace/dist/ /usr/share/nginx/html

# copy nginx.conf 到 nginx 配置文件夹,并替换掉初始的 nginx.conf 文件
COPY --from=frontend /workspace/nginx.conf /etc/nginx/nginx.conf

# copy sh 文件到 nginx 可执行文件路径
COPY --from=frontend /workspace/entrypoint.sh /usr/local/bin/entrypoint.sh

# 赋予 文件可执行权限
RUN chmod +x /usr/local/bin/entrypoint.sh

# linux 系统使用 \n 作为 回车加换行，windows 使用 \r\n 作为回车加换行，所以需要去掉\r
RUN sed -i 's/\r//' /usr/local/bin/entrypoint.sh

# 执行 在镜像实例化为容器时执行的 命令
# 由于 新版 nginx 镜像的某些原因，这里推荐使用 CMD xxx xxx 的方式
CMD /bin/bash /usr/local/bin/entrypoint.sh