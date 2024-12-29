<template>
  <div class="h-screen overflow-hidden">
    <MainLayout @openSettings="showSettings = true" />
    <SettingsWindow v-if="showSettings" @close="showSettings = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import MainLayout from './layouts/MainLayout.vue'
import SettingsWindow from './components/settings/SettingsWindow.vue'
import { type IStaticMethods } from "flyonui/flyonui"

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

const showSettings = ref(false)
const isInitialized = ref(false)
let initTimeout: number | undefined
let retryCount = 0
const MAX_RETRIES = 3
const RETRY_DELAY = 200

const initComponents = async () => {
  try {
    if (window.HSStaticMethods?.autoInit) {
      await window.HSStaticMethods.autoInit();
      isInitialized.value = true;
      console.info('Components initialized successfully');
      
      // 初始化 flyonui 的主题
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      if (retryCount < MAX_RETRIES) {
        retryCount++;
        console.warn(`HSStaticMethods.autoInit not available, retrying... (${retryCount}/${MAX_RETRIES})`);
        initTimeout = window.setTimeout(initComponents, RETRY_DELAY);
      } else {
        console.error('Failed to initialize components after multiple attempts');
      }
    }
  } catch (error) {
    console.error('Error during component initialization:', error);
    if (retryCount < MAX_RETRIES) {
      retryCount++;
      console.warn(`Retrying initialization... (${retryCount}/${MAX_RETRIES})`);
      initTimeout = window.setTimeout(initComponents, RETRY_DELAY);
    }
  }
}

const cleanup = () => {
  if (initTimeout) {
    window.clearTimeout(initTimeout);
    initTimeout = undefined;
  }
  isInitialized.value = false;
  retryCount = 0;
}

onMounted(() => {
  // 等待DOM完全渲染后初始化
  initTimeout = window.setTimeout(initComponents, 100);
})

onUnmounted(() => {
  cleanup();
})
</script>
