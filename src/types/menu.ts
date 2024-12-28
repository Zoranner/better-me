// 主菜单类型
export type MenuType = 'chat' | 'agent' | 'knowledge' | 'tool'

// 基础菜单项接口
export interface BaseItem {
  id: string
  title: string
}

// 对话菜单项
export interface ChatItem extends BaseItem {
  messageCount: number
  lastUpdated: string
}

// 智能体菜单项
export interface AgentItem extends BaseItem {
  description: string
  status: 'online' | 'offline'
}

// 知识库菜单项
export interface KnowledgeItem extends BaseItem {
  count: number
  lastUpdated: string
}

// 工具菜单项
export interface ToolItem extends BaseItem {
  description: string
  tags: string[]
}

// 菜单项联合类型
export type MenuItem = ChatItem | AgentItem | KnowledgeItem | ToolItem

// 菜单状态接口
export interface MenuState {
  activeMainMenu: MenuType
  activeSubMenuId: string | null
  chatList: ChatItem[]
  agentList: AgentItem[]
  knowledgeList: KnowledgeItem[]
  toolList: ToolItem[]
} 