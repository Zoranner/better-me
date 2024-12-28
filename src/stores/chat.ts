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
          content: '你好。',
          isUser: true,
          timestamp: '2024/12/28 20:54:55'
        },
        {
          id: 2,
          content: '你好！很高兴见到你。有什么我可以帮忙的吗？',
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
          content: '我是 Claude，一个AI助手。我可以帮助你完成各种任务。',
          isUser: false,
          timestamp: '2024/12/28 20:54:55',
          tokens: 35,
          model: 'Claude'
        }
      ]
    }
  ])

  const activeChatId = ref<string | null>(null)
  const activeChat = ref<Chat | null>(null)

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
      content,
      timestamp,
      isUser: true
    }

    activeChat.value.messages.push(newMessage)

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse: Message = {
        id: activeChat.value!.messages.length + 1,
        content: '这是一个模拟的AI回复消息。在实际应用中，这里应该调用AI服务获取回复。',
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