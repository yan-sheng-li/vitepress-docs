# Android Studio安装与使用

## 下载

[官网](https://developer.android.com/studio?hl=zh-cn)

![](http://cdn.qiniu.liyansheng.top/img/20250805230243.png)

所需组件清单：

| 项目                       | 说明                         | 大小估算        |
| -------------------------- | ---------------------------- | --------------- |
| Android SDK（含平台工具）  | Android 13 或 Android 14 SDK | 0.6 ~ 1.0 GB    |
| Android SDK Build-Tools    | 编译工具                     | 200 ~ 400 MB    |
| Android Emulator（模拟器） | 虚拟机运行环境               | 400 ~ 800 MB    |
| System Image（系统镜像）   | Pixel 手机镜像，如 x86_64    | 700 MB ~ 1.5 GB |
| Gradle Wrapper + 依赖      | 项目构建工具                 | 100 ~ 300 MB    |

如果你只用 **真机调试**，可以**跳过模拟器和系统镜像安装**，节省近 1.5 GB。

## 初始化

Android Studio + Gradle 第一次导入项目时，会自动从各种远程仓库下载大量依赖包，包括：

- Kotlin 标准库
- Android 构建工具依赖
- Bouncycastle（加密库）
- Glassfish（Java EE相关）
- Google 的 Android 库

这些依赖是项目编译和运行必须的。

## Gradle下载慢

自定义远程仓库源

找到`settings.gradle.kts`，修改如下：

```kotlin
pluginManagement {
    repositories {
        maven { url = uri("https://maven.aliyun.com/repository/gradle-plugin") }
        maven { url = uri("https://maven.aliyun.com/repository/google") }
        maven { url = uri("https://maven.aliyun.com/repository/public") }
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        maven { url = uri("https://maven.aliyun.com/repository/google") }
        maven { url = uri("https://maven.aliyun.com/repository/public") }
        google()
        mavenCentral()
    }
}

rootProject.name = "HelloWorld"
include(":app")
```



## Gradle缓存迁移

> 默认位置：C:\Users\用户名\.gradle

迁移到其他盘，如：`E:\AppCache\gradle_cache`

修改环境变量：

![image-20250806164323249](http://cdn.qiniu.liyansheng.top/img/image-20250806164323249.png)

验证是否生效：

打开 `File` → `Settings` → `Build, Execution, Deployment` → `Build Tools` → `Gradle`

确认“Gradle user home” 显示的是 `E:\AppCache\gradle_cache`（可选操作，仅做验证）

![image-20250806164514270](http://cdn.qiniu.liyansheng.top/img/image-20250806164514270.png)

## Error running 'app': No target device found

- 连接手机，开启USB调试

- 设置 > 关于手机 > 连续点击“版本号”7次 → 进入“开发者选项”

  进入后确认“USB调试”已经打开

确认 adb 能识别手机

## 日志输出

注意： 手机`开发者选项`要把日志相关的开关都打开

![](http://cdn.qiniu.liyansheng.top/img/20250806143928.png)

