<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSettingsStore } from '../../stores/settings'
import { useI18n } from 'vue-i18n'
import type { Language, ThemeMode } from '../../types/settings'

interface Tab {
  id: 'general' | 'user' | 'model' | 'data' | 'about'
  text: string
  icon: string
}

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const { t } = useI18n()
const settingsStore = useSettingsStore()
const activeTab = ref<Tab['id']>('general')

const tabs = computed<Tab[]>(() => [
  { id: 'general', text: t('settings.tabs.general'), icon: '🔧' },
  { id: 'user', text: t('settings.tabs.user'), icon: '👤' },
  { id: 'model', text: t('settings.tabs.model'), icon: '🤖' },
  { id: 'data', text: t('settings.tabs.data'), icon: '💾' },
  { id: 'about', text: t('settings.tabs.about'), icon: 'ℹ️' },
])

const close = () => {
  emit('update:modelValue', false)
}

const handleLanguageChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  const language = target.value as Language
  settingsStore.updateSettings({
    general: {
      language,
      theme: settingsStore.settings.general.theme
    }
  })
}

const handleThemeChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  const theme = target.value as ThemeMode
  settingsStore.updateSettings({
    general: {
      theme,
      language: settingsStore.settings.general.language
    }
  })
}
</script>

<template>
  <div v-if="props.modelValue" class="dialog-overlay" @click="close">
    <div class="dialog" @click.stop>
      <div class="dialog-sidebar">
        <div v-for="tab in tabs" 
             :key="tab.id"
             :class="['tab-item', { active: activeTab === tab.id }]"
             @click="activeTab = tab.id">
          <span class="icon">{{ tab.icon }}</span>
          <span class="text">{{ tab.text }}</span>
        </div>
      </div>
      
      <div class="dialog-content">
        <div class="dialog-header">
          <h2>{{ tabs.find(tab => tab.id === activeTab)?.text }}</h2>
          <button class="close-button" @click="close">×</button>
        </div>
        
        <div class="dialog-body">
          <div v-if="activeTab === 'general'">
            <div class="form-group">
              <label>{{ t('general.language') }}</label>
              <select :value="settingsStore.settings.general.language" 
                      @change="handleLanguageChange">
                <option value="zh-CN">中文</option>
                <option value="en-US">English</option>
              </select>
            </div>
            <div class="form-group">
              <label>{{ t('general.theme') }}</label>
              <select :value="settingsStore.settings.general.theme"
                      @change="handleThemeChange">
                <option value="light">{{ t('general.light') }}</option>
                <option value="dark">{{ t('general.dark') }}</option>
                <option value="system">{{ t('general.system') }}</option>
              </select>
            </div>
          </div>

          <div v-else-if="activeTab === 'user'">
            <div class="form-group">
              <label>{{ t('settings.user.name') }}</label>
              <input type="text" v-model="settingsStore.settings.user.name" :placeholder="t('placeholders.inputUsername')">
            </div>
            <div class="form-group">
              <label>{{ t('settings.user.avatar') }}</label>
              <input type="file" accept="image/*">
            </div>
            <div class="form-group">
              <label>{{ t('settings.user.gender') }}</label>
              <select v-model="settingsStore.settings.user.gender">
                <option value="male">{{ t('settings.user.male') }}</option>
                <option value="female">{{ t('settings.user.female') }}</option>
                <option value="other">{{ t('settings.user.other') }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>{{ t('settings.user.birthDate') }}</label>
              <input type="date" v-model="settingsStore.settings.user.birthDate">
            </div>
          </div>

          <div v-else-if="activeTab === 'model'">
            <h3>{{ t('settings.model.languageModel') }}</h3>
            <div class="form-group">
              <label>{{ t('settings.model.provider') }}</label>
              <select v-model="settingsStore.settings.model.language.provider">
                <option value="openai">OpenAI</option>
                <option value="anthropic">Anthropic</option>
              </select>
            </div>
            <div class="form-group">
              <label>{{ t('settings.model.model') }}</label>
              <select v-model="settingsStore.settings.model.language.model">
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5">GPT-3.5</option>
                <option value="claude-2">Claude 2</option>
              </select>
            </div>
            <div class="form-group">
              <label>{{ t('settings.model.apiKey') }}</label>
              <input type="password" v-model="settingsStore.settings.model.language.apiKey" :placeholder="t('placeholders.inputApiKey')">
            </div>
            <div class="form-group">
              <label>{{ t('settings.model.apiEndpoint') }}</label>
              <input type="text" v-model="settingsStore.settings.model.language.apiEndpoint" :placeholder="t('placeholders.inputApiEndpoint')">
            </div>

            <h3>{{ t('settings.model.embeddingModel') }}</h3>
            <div class="form-group">
              <label>{{ t('settings.model.provider') }}</label>
              <select v-model="settingsStore.settings.model.embedding.provider">
                <option value="openai">OpenAI</option>
                <option value="cohere">Cohere</option>
              </select>
            </div>
            <div class="form-group">
              <label>{{ t('settings.model.model') }}</label>
              <input type="text" v-model="settingsStore.settings.model.embedding.model" :placeholder="t('placeholders.inputModel')">
            </div>
          </div>

          <div v-else-if="activeTab === 'data'">
            <div class="form-group">
              <label>{{ t('settings.data.vectorDb') }}</label>
              <select v-model="settingsStore.settings.data.vectorDb.type">
                <option value="milvus">Milvus</option>
                <option value="qdrant">Qdrant</option>
                <option value="pinecone">Pinecone</option>
              </select>
            </div>
            <div class="form-group">
              <label>{{ t('settings.data.endpoint') }}</label>
              <input type="text" v-model="settingsStore.settings.data.vectorDb.endpoint" :placeholder="t('placeholders.inputApiEndpoint')">
            </div>
            <div class="form-group">
              <label>{{ t('settings.model.apiKey') }}</label>
              <input type="password" v-model="settingsStore.settings.data.vectorDb.apiKey" :placeholder="t('placeholders.inputApiKey')">
            </div>
            <div class="form-group">
              <label>{{ t('settings.data.collection') }}</label>
              <input type="text" v-model="settingsStore.settings.data.vectorDb.collection" :placeholder="t('placeholders.inputCollection')">
            </div>
          </div>

          <div v-else-if="activeTab === 'about'">
            <div class="about-content">
              <h3>Better Me</h3>
              <p>{{ t('settings.about.version') }}：0.9.0</p>
              <p>{{ t('settings.about.description') }}</p>
              <p>{{ t('settings.about.author') }}：Your Name</p>
              <p>{{ t('settings.about.license') }}：MIT License</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog {
  background-color: var(--primary-bg);
  border-radius: 8px;
  display: flex;
  width: 800px;
  height: 600px;
  overflow: hidden;
}

.dialog-sidebar {
  width: 200px;
  background-color: var(--secondary-bg);
  padding: 20px 0;
}

.tab-item {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.tab-item:hover {
  background-color: var(--hover-bg);
}

.tab-item.active {
  background-color: var(--hover-bg);
}

.tab-item .icon {
  margin-right: 12px;
}

.dialog-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.dialog-header {
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-button {
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 24px;
  cursor: pointer;
  padding: 0 8px;
}

.close-button:hover {
  opacity: 0.8;
}

.dialog-body {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: var(--text-color);
  opacity: 0.8;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  background-color: var(--secondary-bg);
  color: var(--text-color);
}

.form-group input[type="file"] {
  padding: 4px 0;
}

h3 {
  margin: 24px 0 16px;
  opacity: 0.8;
}

h3:first-child {
  margin-top: 0;
}

.about-content {
  text-align: center;
  padding: 40px 0;
}

.about-content h3 {
  font-size: 24px;
  margin-bottom: 16px;
}

.about-content p {
  margin: 8px 0;
  opacity: 0.8;
}
</style> 