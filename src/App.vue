<script setup lang="ts">
import MainSidebar from './components/layout/MainSidebar.vue'
import SubSidebar from './components/layout/SubSidebar.vue'
import MainContent from './components/layout/MainContent.vue'
import './styles/variables.css'
import './styles/global.css'
</script>

<template>
  <div class="app-container">
    <MainSidebar />
    <SubSidebar />
    <MainContent />
  </div>
</template>

<style>
#app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.app-container {
  display: flex;
  height: 100%;
  width: 100%;
  background-color: var(--primary-bg);
}
</style>