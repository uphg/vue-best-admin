<template>
  <main class="home flex gap-6 flex-col">
    <div class="flex gap-6" v-for="item in 20" :key="item">
      <div class="w-60 h-45 px-4 py-3 border-rd-2 shadow-base bg-white">总销售额</div>
      <div class="w-60 h-45 px-4 py-3 border-rd-2 shadow-base bg-white">访问量</div>
      <div class="w-60 h-45 px-4 py-3 border-rd-2 shadow-base bg-white">支付笔数</div>
      <div class="w-60 h-45 px-4 py-3 border-rd-2 shadow-base bg-white">运营活动效果</div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
</script>

<style lang="scss" scoped>
.home {
  @apply border-rd-.75;
}
</style>
