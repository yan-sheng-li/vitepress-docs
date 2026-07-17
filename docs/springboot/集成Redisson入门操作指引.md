#  集成Redisson入门操作指引

> Redisson 是一个基于 Redis 的 Java 工具包，它把常见的分布式难题（比如分布式锁、统一缓存、消息队列）都封装成了我们熟悉的 Java 接口。
>
> 简单来说，用 Redisson 操作分布式 Redis，就像操作本地的一个 `HashMap` 或 `ReentrantLock` 一样简单。

### 第一步：添加依赖

在你的 `pom.xml` 文件中加入 Redisson 依赖。推荐使用 Spring Boot Starter，它能帮你自动配置，省去很多麻烦。

```xml
<dependency>
    <groupId>org.redisson</groupId>
    <artifactId>redisson-spring-boot-starter</artifactId>
    <version>3.27.2</version> <!-- 建议使用最新稳定版 -->
</dependency>
```

### 第二步：配置连接

在 `application.yml` 文件中，添加 Redisson 的专属配置。这里以最常见的单机模式为例。

```yaml
redisson:
  config:
    singleServerConfig:
      address: "redis://127.0.0.1:6379"  # Redis 服务器地址
      password: null                     # 密码，没有则留空
      database: 0                        # 使用的数据库编号
      connectionPoolSize: 64             # 连接池大小
```

> Redisson 同样支持集群、哨兵等多种模式，只需修改 `singleServerConfig` 为 `clusterServersConfig` 或 `sentinelServersConfig` 即可，业务代码无需改动。

### 第三步：开始编码

配置好后，你就可以在代码的任何地方注入 `RedissonClient` 来使用它了。

#### 1. 分布式锁 (RLock) —— 解决“超卖”问题

分布式锁是 Redisson 的明星功能。它内置了“看门狗”机制，如果业务没执行完，它会自动给锁续期，不用担心锁提前过期。

```java
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.concurrent.TimeUnit;

@Service
public class ProductService {

    @Autowired
    private RedissonClient redissonClient;

    public void deductStock(String productId) {
        // 1. 为每个商品创建一个唯一的锁对象
        RLock lock = redissonClient.getLock("lock:product:" + productId);
        
        try {
            // 2. 尝试加锁，最多等待10秒，锁10秒后自动释放（如果设置了leaseTime）
            //    如果不设置leaseTime，看门狗会自动续期
            boolean isLocked = lock.tryLock(10, 10, TimeUnit.SECONDS);
            if (isLocked) {
                // 3. 成功获取锁，执行核心业务逻辑（扣减库存等）
                System.out.println("线程 " + Thread.currentThread().getId() + " 获取到锁，开始扣减库存。");
                // ... 业务处理 ...
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        } finally {
            // 4. 释放锁 (一定要在 finally 中释放!)
            if (lock.isLocked() && lock.isHeldByCurrentThread()) {
                lock.unlock();
            }
        }
    }
}
```

#### 2. 分布式集合 (RMap) —— 像操作本地 Map 一样操作缓存

Redisson 把 Redis 的 `Hash` 结构封装成了 Java 的 `Map` 接口，用起来非常自然。

```java
import org.redisson.api.RMap;
import org.redisson.api.RedissonClient;
// ...

RMap<String, Object> userCache = redissonClient.getMap("userCache");
userCache.put("user:1001", "Alice");        // 存数据
String userName = (String) userCache.get("user:1001"); // 取数据
System.out.println(userName); // 输出: Alice
```

#### 3. 发布订阅 (RTopic) —— 实现消息通知

发布-订阅模式在分布式系统中非常常用，Redisson 也提供了简洁的 API。

```java
// --- 订阅者 ---
RTopic topic = redissonClient.getTopic("orderEvents");
topic.addListener(String.class, (channel, msg) -> {
    System.out.println("收到消息: " + msg);
});

// --- 发布者 ---
topic.publish("ORDER_CREATED:1001"); // 发布一条消息
```

### 总结与建议

| 应用场景                 | 推荐工具              | 原因                                                         |
| :----------------------- | :-------------------- | :----------------------------------------------------------- |
| 分布式锁、队列、限流器等 | **Redisson**          | 功能丰富，开箱即用，避免了自行实现带来的诸多陷阱。           |
| 简单、通用的数据缓存     | **Spring Data Redis** | 如果业务简单，使用 `RedisTemplate` 更直接，与 Spring 生态结合更好。 |
