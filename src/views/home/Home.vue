<template>
  <main class="home" border="1 solid [var(--border-color)]"> hi </main>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
</script>

<style lang="scss" scoped>
.home {
  @apply p-4 bg-white border-rd-.75;
}
</style>
