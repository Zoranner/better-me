<template>
  <div class="base-item-styles">
    <slot></slot>
  </div>
</template>

<style scoped>
.base-item-styles {
  width: 100%;
}

.base-item-styles :deep(.item-title) {
  font-size: 0.8rem;
  margin-bottom: 0.125rem;
  opacity: 0.9;
  line-height: 1.2;
}

.base-item-styles :deep(.item-info) {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: space-between;
}

.base-item-styles :deep(.item-desc) {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.25rem;
}

.base-item-styles :deep(.item-status) {
  font-size: 0.65rem;
  padding: 0.125rem 0.25rem;
  border-radius: 3px;
  display: inline-block;
}

.base-item-styles :deep(.item-status.online) {
  background-color: rgba(52, 199, 89, 0.15);
  color: #34c759;
}

.base-item-styles :deep(.item-status.offline) {
  background-color: rgba(255, 69, 58, 0.15);
  color: #ff453a;
}

.base-item-styles :deep(.item-tags) {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.base-item-styles :deep(.tag) {
  font-size: 0.65rem;
  padding: 0.125rem 0.25rem;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
}
</style> 