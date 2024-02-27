<template>
  <main class="home shadow-base"> </main>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
</script>

<style lang="scss" scoped>
.home {
  @apply p-5 bg-white border-rd-.75;
}
</style>
