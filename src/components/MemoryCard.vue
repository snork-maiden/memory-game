<script setup lang="ts">
defineProps<{
  imageSrc: string;
  alt: string;
  isOpen: boolean;
}>();
</script>

<template>
  <div class="card">
    <img :src="imageSrc" :alt="alt" class="img" v-show="isOpen" />
    <div class="card-back" v-show="!isOpen"></div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  font-style: italic;
}

.card-back {
  cursor: pointer;
  transition: background 0.2s ease;
  width: 100%;
  height: 100%;
  background-color: white;
}

.card-back:hover {
  transform: scale(1.05);
  background-color: rgb(250, 246, 246);
}
</style>
