<template>
  <main class="main-content">
    <div class="content-placeholder">
      {{ t('placeholders.selectMenu') }}
    </div>
  </main>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.main-content {
  flex-grow: 1;
  background-color: var(--primary-bg);
  padding: 20px;
}

.content-placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  opacity: 0.5;
  font-size: 1.1rem;
}
</style> 