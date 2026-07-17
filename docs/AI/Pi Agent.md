# Pi Agent

## win环境

目录：`C:\Users\用户名\.pi\agent`

```
{
  "lastChangelogVersion": "0.80.3",
  "defaultProvider": "9",
  "defaultModel": "dev",
  "theme": "dark",
  "npmCommand": [
    "powershell.exe",
    "-NoLogo",
    "-NoProfile",
    "-Command",
    "npm"
  ],
  "shellPath": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
  "terminal": {
    "showTerminalProgress": true
  }
}
```

## 定义全局提示词

- **~/.pi/agent/AGENTS.md**：**全局**的 Agent 指令文件。Pi 启动时会自动加载并注入到上下文中（作为项目指令/规范的一部分）。

- 其他位置的 

  AGENTS.md

   也会被加载（按顺序拼接）：

  - 父目录（从当前工作目录向上查找）
  - 当前项目目录下的 AGENTS.md

- 专门用于 System Prompt 的文件

  （更直接影响核心提示词）：

  - 全局替换：~/.pi/agent/SYSTEM.md
  - 全局追加：~/.pi/agent/APPEND_SYSTEM.md
  - 项目级同理（放在 .pi/ 目录下）

AGENTS.md 主要用于**项目/全局的额外指令、规范、安全规则、常用命令**等，它会和默认系统提示词 + SYSTEM/APPEND_SYSTEM.md 一起组成完整的上下文。