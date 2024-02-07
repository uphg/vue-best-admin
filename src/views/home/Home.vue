<template>
  <main class="home">
    <HelloWorld />
    <div class="px-3 py-2 mt-2 bg-gray-200">
      <p>{{ counter.count }}</p>
      <n-button type="primary" @click="counter.increment">点我+1</n-button>
      <Icon name="logo" />
    </div>

    <div class="w-20 h-20 shadow-medium bg-white c-primary">233</div>
    <div class="c-blue-600">111</div>
    <div>hello</div>
  </main>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
</script>

<style lang="scss" scoped>
.home {
  @apply c-red;
}
</style>
