# SpringBoot集成AI大模型

## 依赖

```xml
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-starter-model-openai</artifactId>
    <version>1.0.0</version>
</dependency>
```

## 配置

`application.yml`

```yml
spring:
  ai:
    openai:
#      api-key: sk-10ee000   # 你的 key
#      base-url: https://api.deepseek.com
#      chat:
#        options:
#          model: deepseek-chat
      api-key: sk-56633d8ae   # 你的 key
      base-url: https://apis.iflow.cn
      chat:
        options:
          model: glm-4.6
```

## 控制器

```java
package com.art.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@Tag(name = "ai对话")
@RequestMapping("/api/front")
public class ChatController {

    private final ChatClient chatClient;

    public ChatController(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    @Operation(summary = "聊天")
    @GetMapping("/chat")
    public String chat(@RequestParam(name = "message") String message) {
        return chatClient.prompt()
                .user(message)
                .call()
                .content();
    }

    @Operation(summary = "流式聊天")
    @GetMapping(value = "/chatStream", produces = "text/event-stream")
    public Flux<String> chatStream(@RequestParam(name = "message") String message) {
        return chatClient.prompt()
                .user(message)
                .stream()
                .content();
    }
}
```

## 示例页面

```vue
<template>
  <div class="chat-container">
    <!-- 聊天窗口 -->
    <div class="chat-window" ref="chatWindow">
      <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.role]">
        <el-card shadow="hover">
          <div class="content" v-html="msg.content"></div>
        </el-card>
      </div>
    </div>

    <!-- 输入区 -->
    <div class="input-area">
      <el-input v-model="input" placeholder="请输入内容..." @keyup.enter="send" :disabled="loading" />
      <el-button type="primary" @click="send" :loading="loading">
        发送
      </el-button>
      <el-button type="danger" v-if="loading" @click="stopGenerate">
        停止
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const input = ref('')
const messages = ref([])
const loading = ref(false)
const chatWindow = ref(null)

let controller = null // 用于停止请求

// 滚动到底部
const scrollToBottom = async () => {
  await nextTick()
  chatWindow.value.scrollTop = chatWindow.value.scrollHeight
}

// 打字机效果
const typeWriter = async (text, msgIndex) => {
  for (let i = 0; i < text.length; i++) {
    messages.value[msgIndex].content += text[i]
    await new Promise(resolve => setTimeout(resolve, 20))
    scrollToBottom()
  }
}

// 发送消息
const send = async () => {
  if (!input.value.trim() || loading.value) return

  // 添加用户消息
  messages.value.push({
    role: 'user',
    content: input.value
  })

  // 添加AI占位消息
  const aiIndex = messages.value.length
  messages.value.push({
    role: 'assistant',
    content: ''
  })

  const userMessage = input.value
  input.value = ''
  loading.value = true

  controller = new AbortController()

  try {
    const response = await fetch(
      `http://localhost:8888/api/front/chatStream?message=${encodeURIComponent(userMessage)}`,
      {
        method: 'GET',
        signal: controller.signal
      }
    )

    const reader = response.body.getReader()
    const decoder = new TextDecoder("utf-8")

    let buffer = ""

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })

      let lines = buffer.split("\n")

      // 保留最后一个不完整的行
      buffer = lines.pop()

      for (let line of lines) {
        if (line.startsWith("data:")) {
          const text = line.replace("data:", "").trim()
          await typeWriter(text, aiIndex)
        }
      }
    }

  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('请求错误:', err)
    }
  } finally {
    loading.value = false
  }
}

// 停止生成
const stopGenerate = () => {
  if (controller) {
    controller.abort()
    loading.value = false
  }
}
</script>

<style scoped>
.chat-container {
  width: 800px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  height: 80vh;
}

.chat-window {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 10px;
}

.message {
  margin-bottom: 15px;
}

.message.user {
  text-align: right;
}

.message.assistant {
  text-align: left;
}

.content {
  white-space: pre-wrap;
}

.input-area {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}
</style>
```

## 注意
> springboot2.x，上面的方式不太兼容，可以用纯请求api的方式

依赖添加
```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-webflux</artifactId>
        </dependency>
```
控制器这样写
```java
package com.hospital.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Api(tags = "ai对话")
@RequestMapping("/api/front")
public class ChatController {

    private final RestTemplate restTemplate = new RestTemplate();

    // 替换成你的 OpenAI Key 或其他 AI 服务的 Key
    private final String OPENAI_API_KEY = "sk-56633d8ae";

    // OpenAI Chat API 地址
    private final String OPENAI_URL = "https://apis.iflow.cn/v1/chat/completions";

    @GetMapping("/chat")
    @ApiOperation("AI对话")
    public String chat(@RequestParam(name = "message") String message) {

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "glm-4.6");

        // Java 8 兼容写法
        Map<String, String> userMessage = new HashMap<>();
        userMessage.put("role", "user");
        userMessage.put("content", message);

        requestBody.put("messages", java.util.Collections.singletonList(userMessage));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(OPENAI_API_KEY);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(OPENAI_URL, entity, Map.class);

        Map<String, Object> body = response.getBody();
        if (body != null && body.get("choices") != null) {
            // 强制转换成 List
            List<Map<String, Object>> choices = (List<Map<String, Object>>) body.get("choices");
            if (!choices.isEmpty()) {
                Map<String, Object> firstChoice = choices.get(0);
                Map<String, Object> messageMap = (Map<String, Object>) firstChoice.get("message");
                if (messageMap != null && messageMap.get("content") != null) {
                    return messageMap.get("content").toString();
                }
            }
        }

        return "AI 未返回内容";
    }

    @GetMapping(value = "/chatStream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @ApiOperation("流式聊天")
    public Flux<String> chatStream(@RequestParam String message) {
        String content = chat(message); // 返回纯文本
        // 按行拆分流式返回
        return Flux.fromArray(content.split("\\n"))
                .filter(line -> !line.trim().isEmpty()) // 去掉空行
                .map(line -> line + "\n\n") 
                .delayElements(Duration.ofMillis(50));  // 模拟延迟
    }
}
```