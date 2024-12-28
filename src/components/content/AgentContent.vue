<template>
  <div class="agent-content">
    <div class="agent-header">
      <div class="agent-info">
        <div class="agent-avatar">🤖</div>
        <div>
          <h2>{{ item?.title }}</h2>
          <p class="agent-description">{{ item?.description }}</p>
        </div>
      </div>
      <div class="agent-status" :class="item?.status">
        {{ item?.status }}
      </div>
    </div>

    <div class="agent-body">
      <div class="agent-section">
        <h3>功能介绍</h3>
        <p>这是一个智能助手，可以帮助你完成特定领域的任务。</p>
      </div>

      <div class="agent-section">
        <h3>使用说明</h3>
        <ul>
          <li>直接输入你的问题或需求</li>
          <li>支持多轮对话</li>
          <li>可以上传相关文件</li>
        </ul>
      </div>

      <div class="agent-section">
        <h3>示例</h3>
        <div class="example-list">
          <div class="example-item">
            "帮我优化这段代码的性能"
          </div>
          <div class="example-item">
            "分析这篇文章的主要观点"
          </div>
          <div class="example-item">
            "给这段文字提供修改建议"
          </div>
        </div>
      </div>
    </div>

    <div class="input-area">
      <textarea 
        placeholder="输入你的需求..."
        v-model="message"
        @keydown.enter.prevent="sendMessage"
      ></textarea>
      <div class="actions">
        <button class="upload-btn">📎</button>
        <button class="send-btn">发送</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { AgentItem } from '../../types/menu'

defineProps<{
  item?: AgentItem
}>()

const message = ref('')

const sendMessage = (e: KeyboardEvent) => {
  if (e.shiftKey) {
    return
  }
  if (message.value.trim()) {
    // TODO: 发送消息
    message.value = ''
  }
}
</script>

<style scoped>
.agent-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #1e1e1e;
}

.agent-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.agent-info {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.agent-avatar {
  width: 3rem;
  height: 3rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.agent-info h2 {
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
  font-weight: 500;
}

.agent-description {
  margin: 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
}

.agent-status {
  font-size: 0.85rem;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  text-transform: capitalize;
}

.agent-status.online {
  background-color: rgba(16, 185, 129, 0.2);
  color: rgb(16, 185, 129);
}

.agent-status.offline {
  background-color: rgba(239, 68, 68, 0.2);
  color: rgb(239, 68, 68);
}

.agent-body {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

.agent-section {
  margin-bottom: 2rem;
}

.agent-section:last-child {
  margin-bottom: 0;
}

.agent-section h3 {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.agent-section p {
  margin: 0;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
}

.agent-section ul {
  margin: 0;
  padding-left: 1.25rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
}

.agent-section li {
  margin-bottom: 0.5rem;
}

.example-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.example-item {
  padding: 0.75rem 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.2s ease;
}

.example-item:hover {
  background-color: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

.input-area {
  padding: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(0, 0, 0, 0.2);
}

textarea {
  width: 100%;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  padding: 1rem;
  resize: none;
  margin-bottom: 0.75rem;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  line-height: 1.5;
}

textarea:focus {
  outline: none;
  border-color: rgba(0, 102, 204, 0.5);
  background-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.2);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

button {
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

button:hover {
  background-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

.upload-btn {
  padding: 0.625rem;
}

.send-btn {
  background-color: #0066cc;
  font-weight: 500;
}

.send-btn:hover {
  background-color: #0052a3;
}
</style> 