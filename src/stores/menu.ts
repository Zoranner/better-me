import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { MenuId, MenuItem, SubMenuData } from '../types/menu'

export const useMenuStore = defineStore('menu', () => {
  const mainMenuItems: MenuItem[] = [
    { icon: "💬", id: "chat" },
    { icon: "🤖", id: "agents" },
    { icon: "🔧", id: "tools" },
    { icon: "📚", id: "knowledge" },
  ]

  const activeMainMenu = ref<MenuId>('chat')

  const subMenuItems: SubMenuData = {
    chat: [
      { title: "与 GPT-4 的对话", time: "10:30" },
      { title: "与 Claude 的对话", time: "昨天" },
      { title: "需求分析讨论", time: "2天前" },
    ],
    agents: [
      { title: "文章助手", description: "帮助撰写和优化文章" },
      { title: "代码助手", description: "编程开发助手" },
      { title: "数据分析师", description: "数据处理与分析" },
    ],
    tools: [
      { title: "文本转语音", description: "将文本转换为自然语音" },
      { title: "图片生成", description: "AI 图像生成工具" },
      { title: "格式转换", description: "各类文件格式转换" },
    ],
    knowledge: [
      { title: "编程知识库", description: "开发相关资料" },
      { title: "产品文档", description: "产品设计与规划" },
      { title: "学习笔记", description: "个人知识整理" },
    ],
  }

  function setActiveMainMenu(menuId: MenuId) {
    activeMainMenu.value = menuId
  }

  return {
    mainMenuItems,
    activeMainMenu,
    subMenuItems,
    setActiveMainMenu,
  }
}) 