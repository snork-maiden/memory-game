<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import MemoryCard from "./MemoryCard.vue";
import ReplayButton from "./ReplayButton.vue";
import { fetchRandomPhotos } from "@/api";
import type { CardData } from "@/interfaces";

interface MemoryCardData extends CardData {
  cardId: string;
  isOpen: boolean;
}

const memoryCards: Ref<MemoryCardData[] | null> = ref(null);

onMounted(async () => await getMemoryCards());

async function getMemoryCards() {
  const cardData = await fetchRandomPhotos();

  if (!cardData.length) return;

  const doubledCards: MemoryCardData[] = cardData
    .map((item) => [
      { ...item, cardId: item.id + "-1", isOpen: true },
      { ...item, cardId: item.id + "-2", isOpen: true },
    ])
    .flat();

  memoryCards.value = shuffle(doubledCards);

  function shuffle(array: Array<any>): Array<any> {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
</script>

<template>
  <div class="error" v-if="!memoryCards">
    Failed to load photos, please try again later
  </div>

  <ReplayButton @click="getMemoryCards" />

  <div class="wrapper" v-if="memoryCards">
    <MemoryCard
      v-for="card of memoryCards"
      :key="card.cardId"
      :image-src="card.url"
      :alt="card.description"
      :is-open="card.isOpen"
    />
  </div>
</template>
<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 1em;
  width: 100%;
  max-width: 65vh;
}
</style>
