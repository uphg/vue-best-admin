<template>
  <main>
    <HelloWorld/>
    <div class="px-3 py-2 mt-2 bg-gray-200">
      <p>{{ counter.count }}</p>
      <n-button type="primary" @click="counter.increment">点我+1</n-button>
      <Icon name="logo"/>
    </div>
  </main>
</template>

<script setup lang="ts">
const counter = useCounterStore()

</script>
