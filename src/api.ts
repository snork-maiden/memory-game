import type { CardData } from "./interfaces";

const apiKey = import.meta.env.VITE_API_KEY;

export async function fetchRandomPhotos(
  count: number = 15
): Promise<CardData[]> {
  const params = new URLSearchParams({
    count: count + "",
  });

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?${params}`,
      {
        headers: {
          Authorization: `Client-ID ${apiKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const photos = await response.json();
    const formattedPhotos: CardData[] = photos.map((photo: any) => ({
      id: photo.id,
      url: photo.urls.small,
      description: photo.description,
    }));

    if (formattedPhotos.length < count) {
      const remainingCount = count - formattedPhotos.length;
      const additionalPhotos = await fetchRandomPhotos(remainingCount);
      return [...formattedPhotos, ...additionalPhotos];
    }

    return formattedPhotos;
  } catch (error) {
    console.error("Failed to fetch photos from Unsplash:", error);
    return [];
  }
}
