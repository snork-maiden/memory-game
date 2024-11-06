<script setup lang="ts">
import TheMemoryGame from "./components/TheMemoryGame.vue";
</script>

<template>
  <main class="main">
    <h1 class="title">Memory match</h1>
    <TheMemoryGame />
  </main>
</template>

<style scoped>
 .main {
  display: flex;
  flex-direction: column;
  align-items: center;
 }
</style>
