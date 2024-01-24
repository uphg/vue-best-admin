<template>
  <n-spin :show="$loading.visible">
    <n-message-provider>
      <RouterView />
    </n-message-provider>
    <template v-if="$loading.message" #description>
      {{ $loading.message }}
    </template>
  </n-spin>
</template>

<script setup lang="ts">
const { $loading } = useGlobalLoading()

loadGlobalMessage()
</script>
