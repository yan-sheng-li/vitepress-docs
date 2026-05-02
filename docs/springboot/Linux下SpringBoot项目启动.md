## Linux下SpringBoot项目启动

### 一、 核心工具：Maven Wrapper (`mvnw`)

**什么是 `mvnw`？**

它是项目的“环境保姆”。一个 Shell 脚本，允许你在**不安装全局 Maven** 的情况下运行 Maven 命令。

**核心优势：**

- **零安装**：只需 JDK，脚本会自动下载匹配版本的 Maven。
- **版本一致性**：确保开发、测试、生产环境使用完全相同的 Maven 版本。
- **环境隔离**：不同项目可以使用不同版本的 Maven，互不干扰。

------

### 二、 快速启动三部曲

进入项目根目录后，执行以下操作：

1. **赋予执行权限**（克隆后的文件默认可能无权限）：

   Bash

   ```
   chmod +x mvnw
   ```

2. **清理并运行**：

   Bash

   ```
   ./mvnw clean spring-boot:run
   ```

3. **生产环境打包运行**：

   Bash

   ```
   # 打包并跳过测试
   ./mvnw clean package -DskipTests
   # 后台持续运行
   nohup java -jar target/*.jar > server.log 2>&1 &
   ```

------

### 三、 常见编译错误：Java 版本冲突

**错误现象：**

```
Source option 5 is no longer supported. Use 7 or later.
```

**根本原因：**

Maven 默认编译器版本太老（回退到了 Java 5），而现代 JDK（如 JDK 17/21）已不再支持该版本。

**解决方案：**

在 `pom.xml` 中显式指定编译器版本，确保其与系统安装的 JDK 版本一致。

XML

```
<properties>
    <java.version>17</java.version> <!-- 必须与系统 java -version 一致 -->
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <!-- 显式覆盖，解决兼容性报错 -->
    <maven.compiler.source>${java.version}</maven.compiler.source>
    <maven.compiler.target>${java.version}</maven.compiler.target>
</properties>
```

------

### 四、 进阶开发技巧

- **指定端口启动**：

  `./mvnw spring-boot:run -Dspring-boot.run.arguments="--server.port=9090"`

- **Git 管理**：

  `mvnw`、`mvnw.cmd` 以及 `.mvn/` 目录**必须提交**到 Git 仓库，这是实现“开箱即用”的关键。

- **临时切换 JDK**：

  如果系统有多个 JDK，可以临时指定：

  `JAVA_HOME=/path/to/jdk-17 ./mvnw spring-boot:run`

------

### 五、 开发者心得

将“环境配置”转化为“代码（Wrapper）”是现代 Java 开发的最佳实践。它不仅简化了部署流程，也极大地降低了团队协作时环境搭建的沟通成本。