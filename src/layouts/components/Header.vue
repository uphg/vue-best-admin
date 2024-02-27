<template>
  <header class="header" flex="~ col justify-center">
    <!-- Breadcrumbs nav -->
    <div></div>

    <!-- Tags nav -->
    <div>
      <div class="cursor-pointer" @click="sidebar.toggleCollapsed">
        <Icon :name="`menu-${sidebar.collapsed ? 'fold' : 'unfold'}`" />
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
  @apply h-14 box-border px-6 bg-white shadow-base;
}
</style>
