import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { MenuType, ChatItem, AgentItem, KnowledgeItem, ToolItem } from '../types/menu'

export const useMenuStore = defineStore('menu', () => {
  // 状态
  const activeMainMenu = ref<MenuType>('chat')
  const activeSubMenuId = ref<string | null>(null)
  
  const chatList = ref<ChatItem[]>([
    {
      id: '1',
      title: '示例对话',
      messageCount: 12,
      lastUpdated: '2024-01-01'
    }
  ])
  
  const agentList = ref<AgentItem[]>([
    {
      id: '1',
      title: '通用助手',
      description: '可以帮你完成各种任务',
      status: 'online'
    }
  ])
  
  const knowledgeList = ref<KnowledgeItem[]>([
    {
      id: '1',
      title: '示例知识库',
      count: 100,
      lastUpdated: '2024-01-01'
    }
  ])
  
  const toolList = ref<ToolItem[]>([
    {
      id: '1',
      title: '代码编辑器',
      description: '智能代码编辑和补全',
      tags: ['编程', 'AI']
    }
  ])

  // 方法
  function setActiveMainMenu(type: MenuType) {
    if (type !== activeMainMenu.value) {
      activeMainMenu.value = type
      activeSubMenuId.value = null
    }
  }

  function setActiveSubMenu(id: string | null) {
    activeSubMenuId.value = id
  }

  function addChat(chat: Omit<ChatItem, 'id'>) {
    const id = Date.now().toString()
    chatList.value.unshift({ ...chat, id })
    return id
  }

  function addAgent(agent: Omit<AgentItem, 'id'>) {
    const id = Date.now().toString()
    agentList.value.unshift({ ...agent, id })
    return id
  }

  function addKnowledge(knowledge: Omit<KnowledgeItem, 'id'>) {
    const id = Date.now().toString()
    knowledgeList.value.unshift({ ...knowledge, id })
    return id
  }

  function addTool(tool: Omit<ToolItem, 'id'>) {
    const id = Date.now().toString()
    toolList.value.unshift({ ...tool, id })
    return id
  }

  function removeChat(id: string) {
    const index = chatList.value.findIndex(item => item.id === id)
    if (index > -1) {
      chatList.value.splice(index, 1)
      if (activeSubMenuId.value === id) {
        activeSubMenuId.value = chatList.value[0]?.id || null
      }
    }
  }

  function removeAgent(id: string) {
    const index = agentList.value.findIndex(item => item.id === id)
    if (index > -1) {
      agentList.value.splice(index, 1)
      if (activeSubMenuId.value === id) {
        activeSubMenuId.value = agentList.value[0]?.id || null
      }
    }
  }

  function removeKnowledge(id: string) {
    const index = knowledgeList.value.findIndex(item => item.id === id)
    if (index > -1) {
      knowledgeList.value.splice(index, 1)
      if (activeSubMenuId.value === id) {
        activeSubMenuId.value = knowledgeList.value[0]?.id || null
      }
    }
  }

  function removeTool(id: string) {
    const index = toolList.value.findIndex(item => item.id === id)
    if (index > -1) {
      toolList.value.splice(index, 1)
      if (activeSubMenuId.value === id) {
        activeSubMenuId.value = toolList.value[0]?.id || null
      }
    }
  }

  // 计算属性
  const currentList = computed(() => {
    switch (activeMainMenu.value) {
      case 'chat':
        return chatList.value
      case 'agent':
        return agentList.value
      case 'knowledge':
        return knowledgeList.value
      case 'tool':
        return toolList.value
    }
  })

  const currentItem = computed(() => {
    if (!activeSubMenuId.value) return null
    return currentList.value.find(item => item.id === activeSubMenuId.value) || null
  })

  return {
    // 状态
    activeMainMenu,
    activeSubMenuId,
    chatList,
    agentList,
    knowledgeList,
    toolList,
    
    // 计算属性
    currentList,
    currentItem,
    
    // 方法
    setActiveMainMenu,
    setActiveSubMenu,
    addChat,
    addAgent,
    addKnowledge,
    addTool,
    removeChat,
    removeAgent,
    removeKnowledge,
    removeTool
  }
}) 