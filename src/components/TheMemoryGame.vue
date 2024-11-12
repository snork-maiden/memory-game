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
const openMemoryCards: Ref<MemoryCardData[]> = ref([]);

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

  setTimeout(() => {
    memoryCards.value!.forEach((item) => (item.isOpen = false));
  }, 6000);

  function shuffle(array: Array<any>): Array<any> {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}

function openCard(card: MemoryCardData): void {
  if (openMemoryCards.value.length > 1) {
    return;
  }

  card.isOpen = !card.isOpen;
  openMemoryCards.value.push(card);

  if (openMemoryCards.value.length === 1) return;

  const [firstCard, secondCard] = openMemoryCards.value;
  if (firstCard.id === secondCard.id) {
    openMemoryCards.value = [];
    return;
  }

  setTimeout(() => closeOpenCards(), 1500);

  function closeOpenCards(): void {
    openMemoryCards.value.forEach((card) => {
      card.isOpen = false;
    });
    openMemoryCards.value = [];
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
      v-for="card in memoryCards"
      :key="card.cardId"
      :image-src="card.url"
      :alt="card.description"
      :is-open="card.isOpen"
      :clickable="openMemoryCards.length < 2"
      @open="openCard(card)"
    />
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1em;
  width: 100%;
  max-width: 65vh;
}
</style>
