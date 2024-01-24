<template>
  <div class="c-blue">
    <svg class="w-1.2em h-1.2em">
      <use :xlink:href="`#${name}`"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: String as PropType<string>
})
</script>
