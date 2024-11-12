<script setup lang="ts">
defineProps<{
  imageSrc: string;
  alt: string;
  isOpen: boolean;
  clickable: boolean;
}>();

defineEmits<{
  (e: "open"): void;
}>();
</script>

<template>
  <div class="card" :class="{ 'card--flipped': isOpen }">
    <div class="card-inner">
      <div
        class="card-back"
        :class="{ 'card-back--clickable': clickable }"
        @click="$emit('open')"
      ></div>
      <img :src="imageSrc" :alt="alt" class="img card-front" />
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: transparent;
  perspective: 1000px;
  width: 100%;
  aspect-ratio: 1 / 1;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card--flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.card-front {
  transform: rotateY(180deg);
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  font-style: italic;
}

.card-back {
  transition: background 0.2s ease;
  background-color: white;
}

.card-back--clickable {
  cursor: pointer;
}

.card-back--clickable:hover {
  transform: scale(1.05);
  background-color: rgb(250, 246, 246);
}
</style>
