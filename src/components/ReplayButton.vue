<script setup lang="ts">
import IconReplay from "./icons/IconReplay.vue";
</script>

<template>
  <button type="button" class="replay"><IconReplay /></button>
</template>

<style scoped>
.replay {
  cursor: pointer;
  border: none;
  background: none;
  padding: 1em;
  transition: transform 0.2s;
}

.replay:hover,
.replay:active {
  transform: scale(1.03);
  opacity: 0.9;
}
</style>
