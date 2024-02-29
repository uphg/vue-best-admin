<template>
  <header class="header" flex="~ col justify-center">
    <!-- Breadcrumbs nav -->
    <div class="h-14"></div>

    <!-- Tags nav -->
    <div class="h-14" flex="~ items-center">
      <div class="flex cursor-pointer" @click="sidebar.toggleCollapsed">
        <Icon :name="`menu-${sidebar.collapsed ? 'unfold' : 'fold'}`" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'

const sidebar = useSidebarStore()
</script>

<style lang="scss" scoped>
.header {
  border-block-end: 1px solid var(--border-color);
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  @apply px-6 box-border;
}
</style>
