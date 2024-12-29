<template>
  <div class="w-80 h-full flex flex-col bg-base-100 border-r border-base-200">
    <ChatList
      v-if="type === 'chat'"
      :items="chatList"
      :active-id="activeId"
      @select="$emit('select', $event)"
      @new="handleNew"
    />
    <AgentList
      v-else-if="type === 'agent'"
      :items="agentList"
      :active-id="activeId"
      @select="$emit('select', $event)"
      @new="handleNew"
    />
    <KnowledgeList
      v-else-if="type === 'knowledge'"
      :items="knowledgeList"
      :active-id="activeId"
      @select="$emit('select', $event)"
      @new="handleNew"
    />
    <ToolList
      v-else-if="type === 'tool'"
      :items="toolList"
      :active-id="activeId"
      @select="$emit('select', $event)"
      @new="handleNew"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMenuStore } from '../../stores/menu'
import type { MenuType } from '../../types/menu'

import ChatList from '../lists/ChatList.vue'
import AgentList from '../lists/AgentList.vue'
import KnowledgeList from '../lists/KnowledgeList.vue'
import ToolList from '../lists/ToolList.vue'

const props = defineProps<{
  type: MenuType
  activeId: string | null
}>()

defineEmits<{
  (e: 'select', id: string): void
}>()

const menuStore = useMenuStore()
const { chatList, agentList, knowledgeList, toolList } = storeToRefs(menuStore)

const handleNew = () => {
  console.log('handleNew called', props.type)
  let id: string
  switch (props.type) {
    case 'chat':
      id = menuStore.addChat({
        title: '新对话',
        messageCount: 0,
        lastUpdated: new Date().toLocaleDateString()
      })
      console.log('Created new chat with id:', id)
      break
    case 'agent':
      id = menuStore.addAgent({
        title: '新智能体',
        description: '描述你的智能体...',
        status: 'online'
      })
      console.log('Created new agent with id:', id)
      break
    case 'knowledge':
      id = menuStore.addKnowledge({
        title: '新知识库',
        count: 0,
        lastUpdated: new Date().toLocaleDateString()
      })
      console.log('Created new knowledge with id:', id)
      break
    case 'tool':
      id = menuStore.addTool({
        title: '新工具',
        description: '描述你的工具...',
        tags: ['新建']
      })
      console.log('Created new tool with id:', id)
      break
  }
  menuStore.setActiveSubMenu(id)
  console.log('Set active sub menu to:', id)
}
</script> 