<template>
  <div class="app-container">
    <MainLayout @openSettings="showSettings = true" />
    <SettingsWindow v-if="showSettings" @close="showSettings = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainLayout from './layouts/MainLayout.vue'
import SettingsWindow from './components/settings/SettingsWindow.vue'

const showSettings = ref(false)
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

* {
  box-sizing: border-box;
}

#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.app-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #1e1e1e;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
