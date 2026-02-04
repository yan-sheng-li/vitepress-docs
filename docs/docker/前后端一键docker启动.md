# 前后端一键docker启动步骤

::: tip
目标：SpringBoot+Vue项目一键基于docker部署，并定时备份数据库
:::

## docker-compose

```dockerfile
version: '3.9'

services:

  mysql:
    image: mysql:8.0
    container_name: mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: xxx_db
    ports:
      - "3308:3306"
    command: 
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_unicode_ci
    volumes:
      - ./docker/mysql/init:/docker-entrypoint-initdb.d  
      - ./docker/mysql/conf.d:/etc/mysql/conf.d
      - mysql_data:/var/lib/mysql

  backend:
    build: ./backend
    container_name: backend
    restart: always
    depends_on:
      - mysql
    ports:
      - "9092:9092"

  frontend:
    build: ./frontend
    container_name: frontend
    restart: always
    ports:
      - "8080:80"
    depends_on:
      - backend
  mysql_backup:
    image: alpine:3.19
    container_name: mysql_backup
    restart: always
    depends_on:
      - mysql
    volumes:
      - ./docker/mysql/backup:/backup
    environment:
      - TZ=Asia/Shanghai
    entrypoint: >
      sh -c "
      apk add --no-cache mysql-client tzdata &&
      chmod +x /backup/backup.sh &&
      (crontab -l 2>/dev/null; echo '* * * * * /bin/sh /backup/backup.sh >> /backup/backup.log 2>&1') | crontab - &&
      crond -f -l 2
      "


volumes:
  mysql_data:

```

## 后端dockerfile

```dockerfile
# ========= 1. build 阶段 =========
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app

# 1️⃣ 先拷贝 pom，利用 Docker 缓存
COPY pom.xml .
RUN mvn -B dependency:go-offline

# 2️⃣ 再拷贝源码并构建
COPY src ./src
RUN mvn -B package -DskipTests


# ========= 2. run 阶段 =========
FROM eclipse-temurin:17-ubi9-minimal
WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 9092
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=docker", "app.jar"]
```

## 前端dockerfile

```dockerfile
# ========= 1. build 阶段 =========
FROM node:18-alpine AS builder
WORKDIR /app

# 先拷贝依赖描述，利用缓存
COPY .npmrc .npmrc
COPY package*.json ./
RUN npm install

# 再拷贝源码并打包
COPY . .
RUN npm run build


# ========= 2. run 阶段 =========
FROM nginx:1.25-alpine

# 拷贝你自己的 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 从 build 阶段拷贝 dist
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## docker目录

```bash
└─mysql
    │  my.cnf
    │
    ├─backup
    │      backup.sh
    │      crontab
    │
    ├─conf.d
    │      utf8mb4.cnf
    │
    └─init
            create_backup_user.sql
            init.sql
```

### crontab

```bash
# 每天凌晨1点执行备份
0 1 * * * root /bin/sh /backup/backup.sh >> /backup/backup.log 2>&1
```



### backup.sh

```bash
#!/bin/sh

# 设置环境变量
export PATH=/bin:/usr/bin:/usr/local/bin
export HOME=/root
# 设置时区为中国时区
export TZ=Asia/Shanghai

BACKUP_DIR=/backup
DATE=$(date +%Y%m%d_%H%M%S)
FILENAME=xxx_db_${DATE}.sql.gz

# 格式化的时间显示
FORMATTED_TIME=$(date '+%Y-%m-%d %H:%M:%S')

# 记录开始时间
echo "[${FORMATTED_TIME}] 开始备份" >> ${BACKUP_DIR}/backup.log

mysqldump \
  -h mysql \
  -ubackup \
  -pbackup123 \
  --no-tablespaces \
  --single-transaction \
  --default-character-set=utf8mb4 \
  xxx_db \
| gzip > ${BACKUP_DIR}/${FILENAME}



# 删除 7 天前的备份
find ${BACKUP_DIR} -type f -mtime +7 -delete

# 更新格式化时间
FORMATTED_TIME=$(date '+%Y-%m-%d %H:%M:%S')

# 记录完成时间
echo "[${FORMATTED_TIME}] 备份完成 - ${FILENAME}" >> ${BACKUP_DIR}/backup.log
echo "----------------------------------------" >> ${BACKUP_DIR}/backup.log
```

### my.cnf

```bash
[mysqld]
character-set-server=utf8mb4
collation-server=utf8mb4_general_ci
skip-character-set-client-handshake

[client]
default-character-set=utf8mb4
```

### utf8mb4.cnf

```bash
[mysqld]
character-set-server = utf8mb4
collation-server = utf8mb4_general_ci
skip-character-set-client-handshake

[client]
default-character-set = utf8mb4

[mysql]
default-character-set = utf8mb4
```

### create_backup_user.sql

```bash
-- 创建 backup 用户
CREATE USER IF NOT EXISTS 'backup'@'%' 
IDENTIFIED WITH mysql_native_password BY 'backup123';

-- 查看一下确认（可选）
SELECT user, host, plugin 
FROM mysql.user 
WHERE user = 'backup';

-- 授权
GRANT SELECT, LOCK TABLES, SHOW VIEW, EVENT
ON xxx_db.* 
TO 'backup'@'%';

FLUSH PRIVILEGES;
```

### init.sql

```sql
set character_set_client=utf8;
set character_set_connection=utf8;
set character_set_database=utf8;
set character_set_results=utf8;
set character_set_server=utf8;

-- Create database
CREATE DATABASE IF NOT EXISTS xxx_db DEFAULT CHARSET utf8mb4;
USE xxx_db;


-- 建表sql
```

