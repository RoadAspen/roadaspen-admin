#! /bin/bash

# 开始构建镜像
sudo docker build -t react .

# 推镜像
# sudo docker push react-hook-ts

# 不推镜像或者直接本地 启动容器，以为 nginx 内部配的是 8080端口，这里暴露8080端口给外网

sudo docker run -it -d --name react -p 8080:8080 react bash