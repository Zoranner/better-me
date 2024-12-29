// 消息角色类型
export type MessageRole = 'user' | 'assistant'

// 消息接口
export interface Message {
  id: string
  role: MessageRole
  content: string
  time: string
} 