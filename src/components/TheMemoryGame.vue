<script setup lang="ts">
import { onMounted, ref } from "vue";
import MemoryCard from "./MemoryCard.vue";
import ReplayButton from "./ReplayButton.vue";
import { fetchRandomPhotos } from "@/api";

const memoryCards: any = ref(null);

onMounted(async () => {
  const cardData = await fetchRandomPhotos();

  memoryCards.value = cardData
    .map((item) => [
      { ...item, cardId: item.id + "-1" },
      { ...item, cardId: item.id + "-2" },
    ])
    .flat();
  console.log(memoryCards.value);
});
</script>

<template>
  <ReplayButton />
  <div class="wrapper">
    <MemoryCard v-for="card of memoryCards" :key="card.cardId" />
  </div>
</template>
