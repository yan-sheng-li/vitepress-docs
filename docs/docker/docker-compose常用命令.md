# docker-compose常用命令
> 在 `docker compose up -d` 之后，你可以使用以下常用命令进行管理和操作：

## 1. **查看状态和日志**
```bash
# 查看容器状态
docker compose ps

# 查看所有容器（包括未运行的）
docker compose ps -a

# 查看服务日志
docker compose logs
docker compose logs [service_name]

# 实时查看日志（跟踪）
docker compose logs -f [service_name]

# 查看指定服务的日志
docker compose logs --tail=100 [service_name]  # 查看最后100行
```

## 2. **管理容器**
```bash
# 停止服务（保持容器）
docker compose stop

# 停止并删除容器、网络（不删除卷和数据）
docker compose down

# 停止并删除所有资源（包括卷）
docker compose down -v

# 重启服务
docker compose restart [service_name]

# 暂停服务
docker compose pause [service_name]

# 恢复服务
docker compose unpause [service_name]
```

## 3. **进入容器**
```bash
# 进入容器执行命令（不进入交互模式）
docker compose exec [service_name] [command]
docker compose exec app ls -la

# 进入容器交互模式
docker compose exec -it [service_name] sh
docker compose exec -it [service_name] bash
```

## 4. **更新和重建**
```bash
# 重新构建并启动服务
docker compose up -d --build [service_name]

# 只重新构建，不启动
docker compose build [service_name]

# 拉取最新镜像
docker compose pull

# 强制重建（即使配置未更改）
docker compose up -d --force-recreate
```

## 5. **检查和监控**
```bash
# 查看容器资源使用情况
docker compose top

# 查看容器进程
docker compose ps

# 查看容器配置
docker compose config

# 验证compose文件格式
docker compose config --services
```

## 6. **管理镜像和卷**
```bash
# 删除所有停止的容器和未使用的镜像
docker compose down --rmi all

# 删除所有停止的容器和卷
docker compose down --volumes --remove-orphans

# 查看卷
docker volume ls
```

## 7. **扩展服务**
```bash
# 扩展某个服务的实例数量
docker compose up -d --scale [service_name]=3
```

## 8. **常用组合命令**
```bash
# 查看日志并实时刷新
docker compose logs -f --tail=50

# 重启单个服务并查看日志
docker compose restart [service_name] && docker compose logs -f [service_name]

# 更新服务（拉取镜像并重启）
docker compose pull && docker compose up -d

# 清理所有未使用的资源
docker system prune -a
```

## 9. **实用的快捷操作**
```bash
# 查看环境变量
docker compose exec [service_name] env

# 检查服务健康状态
docker compose exec [service_name] curl localhost:8080/health

# 备份数据库
docker compose exec db pg_dump -U user database > backup.sql
```

