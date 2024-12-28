import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface Message {
  id: number
  content: string
  timestamp: string
  isUser: boolean
  tokens?: number
  model?: string
}

export interface Chat {
  id: string
  title: string
  time: string
  messages: Message[]
}

export const useChatStore = defineStore('chat', () => {
  const chats = ref<Chat[]>([
    {
      id: '1',
      title: '与 GPT-4 的对话',
      time: '10:30',
      messages: [
        {
          id: 1,
          content: '请介绍一下 Markdown 的基本语法，并展示一些数学公式和流程图的例子。',
          isUser: true,
          timestamp: '2024/12/28 20:54:55'
        },
        {
          id: 2,
          content: `好的，我来介绍一下 Markdown 的基本语法，并展示一些示例。

## 基本语法

### 1. 标题
使用 # 号可以表示不同级别的标题，例如：
# 一级标题
## 二级标题
### 三级标题

### 2. 强调
*斜体* 或 _斜体_
**粗体** 或 __粗体__
***粗斜体*** 或 ___粗斜体___

### 3. 列表
无序列表：
- 项目1
- 项目2
  - 子项目A
  - 子项目B

有序列表：
1. 第一项
2. 第二项
   1. 子项目1
   2. 子项目2

### 4. 代码
行内代码：\`console.log('Hello World')\`

代码块：
\`\`\`javascript
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(5)); // 输出: 120
\`\`\`

## 数学公式

### 1. 行内公式
爱因斯坦质能方程：$E = mc^2$

### 2. 块级公式
\`\`\`math
\\sum_{i=1}^n i = \\frac{n(n+1)}{2}
\`\`\`

\`\`\`math
f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi
\`\`\`

## 流程图

### 1. 简单流程图
\`\`\`mermaid
graph TD
    A[开始] --> B{是否有账号?}
    B -->|是| C[登录]
    B -->|否| D[注册]
    C --> E[进入主页]
    D --> E
\`\`\`

### 2. 时序图
\`\`\`mermaid
sequenceDiagram
    participant 用户
    participant 客户端
    participant 服务器
    
    用户->>客户端: 输入用户名密码
    客户端->>服务器: 发送登录请求
    服务器-->>客户端: 返回登录结果
    客户端-->>用户: 显示登录状态
\`\`\`

这些只是 Markdown 的一部分功能，你可以根据需要组合使用这些语法来创建丰富的文档内容。`,
          isUser: false,
          timestamp: '2024/12/28 20:54:55',
          tokens: 43,
          model: 'GPT-4'
        }
      ]
    },
    {
      id: '2',
      title: '与 Claude 的对话',
      time: '昨天',
      messages: [
        {
          id: 1,
          content: '你好，你是谁？',
          isUser: true,
          timestamp: '2024/12/28 20:54:55'
        },
        {
          id: 2,
          content: '我是 Claude，一个AI助手。我可以帮助你完成各种任务。\n\n例如，我可以：\n\n1. 回答问题\n2. 编写代码\n3. 分析数据\n4. 创建图表\n\n```mermaid\ngraph LR\n    A[输入] --> B[处理]\n    B --> C[输出]\n    B --> D[反馈]\n    D --> A\n```',
          isUser: false,
          timestamp: '2024/12/28 20:54:55',
          tokens: 35,
          model: 'Claude'
        }
      ]
    }
  ])

  const activeChatId = ref<string | null>('1')
  const activeChat = ref<Chat | null>(chats.value[0])

  function setActiveChat(chatId: string) {
    activeChatId.value = chatId
    activeChat.value = chats.value.find(chat => chat.id === chatId) || null
  }

  function sendMessage(content: string) {
    if (!activeChat.value) return

    const timestamp = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })

    const newMessage: Message = {
      id: activeChat.value.messages.length + 1,
      content: content.includes('\n') ? content : content.trim(),
      timestamp,
      isUser: true
    }

    activeChat.value.messages.push(newMessage)

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse: Message = {
        id: activeChat.value!.messages.length + 1,
        content: `让我用 Markdown 来回复你：

\`\`\`
${content}
\`\`\`

## 回应
你说的很有趣。让我用一个流程图来表示：

\`\`\`mermaid
graph TD
    A[收到消息] --> B{理解内容}
    B -->|是| C[生成回复]
    B -->|否| D[请求澄清]
    C --> E[发送回复]
    D --> A
\`\`\`

### 数学公式示例
这里是一个简单的数学公式：$f(x) = x^2 + 2x + 1$

### 代码示例
\`\`\`python
def greet(name):
    return f"Hello, {name}!"
\`\`\``,
        timestamp: new Date().toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }),
        isUser: false,
        tokens: 35,
        model: activeChat.value!.id === '1' ? 'GPT-4' : 'Claude'
      }
      activeChat.value!.messages.push(aiResponse)
    }, 1000)
  }

  return {
    chats,
    activeChatId,
    activeChat,
    setActiveChat,
    sendMessage
  }
}) 