# Termux TTS 完整配置流程

**关键点**：Termux 要发出声音，必须同时安装 **命令行工具** (`termux-api` 包) 和 **Android 配套应用** (Termux:API)。

| 组件           | 安装位置      | 作用                           | 安装方式                                  |
| :------------- | :------------ | :----------------------------- | :---------------------------------------- |
| **命令行工具** | Termux 终端内 | 提供 `termux-tts-speak` 等命令 | `pkg install termux-api`                  |
| **配套应用**   | Android 系统  | 真正调用手机硬件发声           | 从 **F-Droid** 搜索 **Termux:API** 并安装 |

**配置步骤**：
1.  在 Termux 中运行：`pkg update && pkg install termux-api`
2.  从 F-Droid 下载并安装 **Termux:API** 应用。或者 👉[GitHub下载](https://github.com/termux/termux-api/releases/tag/v0.53.0)
3.  **关键步骤**：在系统设置中，为 **Termux:API** 应用开启“麦克风”或“TTS”权限，并关闭其电池优化。
4.  **彻底重启** Termux 应用和 Termux:API 应用。

**验证命令**：

```bash
termux-tts-speak "测试成功，语音正常"
```
如果听到声音，即配置成功。

---

## 🤖 集成 Agent 实现任务通知

你可以让任何 Agent（如 Hermes Agent）在任务完成后，调用 Termux 命令来通知你。

### **方案一：通用包装脚本（推荐，兼容任何 Agent）**

创建一个启动脚本，捕获 Agent 的结束状态：

```bash
#!/bin/bash
# 文件名: run-with-notify.sh

# 1. 运行你的 Agent 命令，并传递所有参数
# 请将 'your-agent-command' 替换为实际的启动命令
your-agent-command "$@"

# 2. 检查命令是否成功执行
if [ $? -eq 0 ]; then
    # 成功：发送通知并语音朗读
    termux-notification -t "✅ 任务成功" -c "Agent 已完成您的任务。"
    termux-tts-speak "任务成功完成。"
else
    # 失败：发送错误通知
    termux-notification -t "❌ 任务失败" -c "Agent 执行出错，请检查日志。"
    termux-tts-speak "任务执行失败。"
fi
```

**使用方法**：
```bash
chmod +x run-with-notify.sh
./run-with-notify.sh <你的Agent命令和参数>
```

### **方案二：Agent 深度集成（以 Hermes Agent 为例）**

为 Agent 创建一个自定义 **工具**，让它自己决定何时通知。

1.  在 Hermes Agent 的工具目录下（如 `~/.hermes/tools/`）创建 `termux_notify.py`
2.  参考前文对话中的代码，定义 `termux_notify` 工具。
3.  之后，你只需对 Agent 说：“完成任务后，用 `termux_notify` 工具告诉我结果。”

---

## 💡 实用提醒

*   **权限持久化**：为 **Termux:API** 应用开启“自启动”、“后台活动”和“显示悬浮窗”权限，可避免命令执行后无反应。
*   **故障排查**：如果命令卡住，手动点开一次 **Termux:API** 的空白应用界面即可恢复。
*   **创意延伸**：除了语音和通知，你还可以用同样的方法集成振动 (`termux-vibrate`)、闪光灯 (`termux-torch`)、调整亮度 (`termux-brightness`) 等，实现更丰富的反馈。

---

## 其他命令

Termux:API 不只是能“说话”，它相当于给你的终端开了个“后门”，可以直接调用手机的各种硬件和系统功能。

为了方便你探索，我把这些玩法分成了 6 类，你可以挑感兴趣的试试：

- **📱 系统控制**：这可能是最实用的，能直接操控手机状态。
    - `termux-battery-status`：查看电池健康度、电压、温度。
    - `termux-brightness 200`：设置屏幕亮度（范围0-255）。
    - `termux-torch on/off`：开关闪光灯当手电筒。
    - `termux-vibrate -d 1000`：让手机振动1000毫秒，脚本跑完提醒自己。
    - `termux-wallpaper ~/pic.jpg`：更换桌面壁纸。

- **🔔 交互与通知**：跟手机状态栏和应用进行交互。
    - `termux-notification -t "标题" -c "内容"`：发送系统通知。
    - `termux-toast "一句话"`：屏幕底部弹出一句小提示。
    - `termux-dialog`：弹出系统原生的输入框、日期选择器或列表。
    - `termux-clipboard-set "内容"` / `termux-clipboard-get`：用命令行读写剪贴板。

- **📡 传感器与定位**：获取手机的物理感知数据。
    - `termux-location`：获取GPS或网络定位的经纬度。
    - `termux-sensor`：读取加速度计、陀螺仪、光感等传感器数据。
    - `termux-wifi-scaninfo`：扫描并列出附近的Wi-Fi热点。

- **☎️ 通信功能**：前提是你要给APP授予相关权限。
    - `termux-sms-send -n 号码 "内容"`：自动发短信。
    - `termux-telephony-call 号码`：直接拨打电话。
    - `termux-contact-list`：把所有联系人导出到终端。

- **📷 媒体与文件**：操控相机、播放音乐、管理文件。
    - `termux-camera-photo -c 0 photo.jpg`：拍照并保存。
    - `termux-media-player play music.mp3`：播放音乐（还记得之前试过的这个命令吧）。
    - `termux-microphone-record -f audio.mp3`：用麦克风录制音频。
    - `termux-download <url>`：用系统下载器下载文件。

- **✨ 进阶自动化**：单独用这些命令有点“玩具”，但如果把它们和Shell脚本、`at`命令（定时任务）结合，威力就大了。
    - **低电防护**：检测到电量低于15%时，自动发通知并让手机振动。
    - **早安/晚安模式**：设定一个时间，自动关闭Wi-Fi、蓝牙并熄屏，省电又省心。

