<template>
  <div :class="['layout-default', {
    'has-sidebar': true,
    'has-sidebar--collapsed': sidebar.collapsed
  }]">
    <Header/>
    <Content/>
    <Footer/>
  </div>
  <Sidebar />
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import Content from './components/Content.vue'
import Footer from './components/Footer.vue'
import Sidebar from './components/Sidebar.vue'
import { useSidebarStore } from '@/stores/sidebar'

const sidebar = useSidebarStore()
</script>

<style lang="scss" scoped>
.layout-default {

}
.has-sidebar {
  transition: margin 0.3s var(--n-bezier);
  @apply ml-60;
  &--collapsed {
    @apply ml-14;
  }
}
</style>
