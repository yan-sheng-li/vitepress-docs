
# WSL 安装到 D 盘（非官方，但最实用）简要笔记

**核心问题**：官方 `wsl --install` 和商店安装均强制安装到 C 盘，无法直接选择 D 盘。

**最佳解决方案**：手动下载 Rootfs 并通过 `wsl --import` 导入到 D 盘。

## 操作步骤

1.  **下载 Rootfs 镜像 (二选一)**
    -   **Ubuntu 24.04 (推荐)**: [点击下载](https://cloud-images.ubuntu.com/wsl/releases/24.04/current/ubuntu-noble-wsl-amd64-wsl.rootfs.tar.gz)
    -   **Ubuntu 22.04 (稳定)**: [点击下载](https://cloud-images.ubuntu.com/wsl/releases/22.04/current/ubuntu-jammy-wsl-amd64-wsl.rootfs.tar.gz)

2.  **创建目录** (在 D 盘)
    ```powershell
    mkdir D:\wsl\ubuntu
    ```

3.  **导入镜像** (替换 `D:\下载路径\` 为您的实际下载路径)
    ```powershell
    wsl --import Ubuntu D:\wsl\ubuntu D:\下载路径\ubuntu-noble-wsl-amd64-wsl.rootfs.tar.gz
    ```

4.  **启动并创建普通用户**
    ```powershell
    wsl -d Ubuntu
    ```
    进入系统后 (默认 root)，执行：
    ```bash
    adduser 你的用户名
    usermod -aG sudo 你的用户名
    ```

## 方案优点
-   ✅ 系统文件从一开始就位于 D 盘，不占用 C 盘空间。
-   ✅ 过程干净，无需安装商店应用或进行导出/导入的二次操作。
-   ✅ 可完全控制版本。

## 特别说明
-   Ubuntu 官方 WSL 镜像地址已变更为 `cloud-images.ubuntu.com/wsl/releases/` 路径下。
-   新版 Ubuntu 开始提供 `.wsl` 格式镜像，但 `.tar.gz` 格式仍可正常使用。