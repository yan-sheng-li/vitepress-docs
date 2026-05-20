# Unicode Animations 终端动画工具

## 📦 是什么？

一个基于 Node.js 的 npm 包，利用 Unicode 盲文字符在终端中生成动态动画效果。

## 🚀 安装方式

| 方式     | 命令                                | 适用场景           |
| -------- | ----------------------------------- | ------------------ |
| 临时使用 | `npx unicode-animations`            | 偶尔尝鲜，不占空间 |
| 全局安装 | `npm install -g unicode-animations` | 频繁使用，随时调用 |

## 📝 基本命令

```bash
# 运行默认动画
unicode-animations

# 运行指定动画
unicode-animations orbit          # 轨道旋转
unicode-animations pulse          # 脉冲效果
unicode-animations dna            # DNA双螺旋
unicode-animations braille        # 盲文旋转

# 查看所有可用动画
unicode-animations --list

# 在浏览器中打开
unicode-animations --web
```

## 🎬 可用动画列表

| 动画名称            | 效果       |
| ------------------- | ---------- |
| `braille`           | 盲文旋转   |
| `orbit`             | 轨道旋转   |
| `pulse`             | 脉冲       |
| `dna` / `helix`     | 双螺旋     |
| `scan` / `scanline` | 扫描线     |
| `rain`              | 雨滴效果   |
| `sparkle`           | 闪烁       |
| `cascade`           | 瀑布       |
| `checkerboard`      | 棋盘格     |
| `snake`             | 蛇形       |
| `breathe`           | 呼吸       |
| `waverows`          | 波浪行     |
| `fillsweep`         | 填充扫描   |
| `diagswipe`         | 对角线擦拭 |
| `columns`           | 列         |

## 💻 在 Bash 脚本中使用

## 基础模板

```bash
#!/bin/bash

# 启动动画（后台运行）
start_animation() {
    unicode-animations "$1" &
    ANIM_PID=$!
}

# 停止动画
stop_animation() {
    kill $ANIM_PID 2>/dev/null
    printf "\r\033[K"  # 清除当前行
}

# 使用示例
start_animation "orbit"
sleep 3  # 模拟耗时任务
stop_animation
echo "任务完成"
```

## 完整示例

```bash
#!/bin/bash

# 检查是否已安装
if ! command -v unicode-animations &> /dev/null; then
    echo "❌ 请先安装: npm install -g unicode-animations"
    exit 1
fi

# 带动画的任务执行函数
run_task() {
    local task_name=$1
    local duration=$2
    local anim=${3:-"orbit"}
    
    echo "📦 $task_name"
    unicode-animations "$anim" &
    local pid=$!
    
    sleep "$duration"
    
    kill $pid 2>/dev/null
    printf "\r\033[K"
    echo "✅ $task_name 完成"
    echo ""
}

# 执行任务
run_task "下载文件" 2 "pulse"
run_task "编译代码" 3 "dna"
run_task "部署服务" 2 "scan"

echo "🎉 全部完成！"
```

## 🎯 主要用途

| 场景             | 说明                         |
| ---------------- | ---------------------------- |
| **CLI 工具开发** | 为命令行工具添加加载动画     |
| **脚本美化**     | 让长时间运行的脚本有视觉反馈 |
| **终端调试**     | 直观判断脚本是否卡死         |
| **极客炫技**     | 纯属好玩，展示终端特效       |

## ⚠️ 注意事项

1. **参数格式**：直接跟动画名，不需要 `--spinner` 前缀
   ```bash
   ✅ unicode-animations orbit
   ❌ unicode-animations --spinner orbit
   ```

2. **全局安装后只能在命令行使用**，不能在 JS 代码中 `require()`

3. **需要配合后台运行**（`&`）才能在脚本中同时执行其他任务

4. **记得清理进程**，避免动画残留

## 🔧 常见问题

**Q: 为什么我的脚本里动画不显示？**
A: 确保动画在后台运行（加 `&`），并且输出没有被重定向。

**Q: 如何让动画和日志同时显示？**
A: 需要交替停止/重启动画，或者在动画运行时将日志输出到 stderr。

**Q: 安装后输入命令提示找不到？**
A: 检查 npm 全局 bin 目录是否在 PATH 中，或重新打开终端。