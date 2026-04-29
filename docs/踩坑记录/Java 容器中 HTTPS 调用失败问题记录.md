## Java 容器中 HTTPS 调用失败问题记录

### 问题现象
- 本地开发环境调用第三方支付接口正常
- 部署到 Docker 容器后，调用失败，报错：
  ```
  javax.net.ssl.SSLHandshakeException: Received fatal alert: handshake_failure
  ```

### 问题原因
- 第三方支付服务器要求 **TLS 1.2** 协议
- Docker 容器中的 JVM 默认没有正确启用 TLS 1.2，导致握手失败

### 解决方案
在 Dockerfile 的启动命令中添加 JVM 参数，强制指定 TLS 协议版本：

```dockerfile
CMD ["java", \
     "-Dhttps.protocols=TLSv1.2,TLSv1.1,TLSv1", \
     "-Djdk.tls.client.protocols=TLSv1.2", \
     "-jar", \
     "app.jar"]
```

### 参数说明
| 参数                         | 作用                                    |
| ---------------------------- | --------------------------------------- |
| `-Dhttps.protocols`          | 设置 HttpsURLConnection 可用的 TLS 协议 |
| `-Djdk.tls.client.protocols` | 强制 TLS 客户端使用指定的协议版本       |

### 验证结果
添加参数后重新构建镜像，下单功能恢复正常 ✅

### 备注
- 如果问题依然存在，可以尝试将基础镜像从 Alpine 版本换为标准版本（如 `eclipse-temurin:8-jre`），CA 证书更完整
- 添加 `-Djavax.net.debug=ssl:handshake:verbose` 可输出详细握手日志用于排查

