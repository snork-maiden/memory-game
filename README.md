# Memory Match Game

 **Card Matching Game**: A classic memory game where players match pairs of cards with images.
## Features
- **Image Sourcing**: Fetches random images from Unsplash to populate cards.
- **Dark Mode**: Automatically switches to dark mode based on system preferences.

## Stack

- **Vue 3** with Composition API
- **TypeScript**
- **Unsplash API** for random image generation

## Project Setup

```sh
npm install
```

**Unsplash API Key**: Sign up on [Unsplash](https://unsplash.com/developers) and follow their steps to get an API key.

Add your Unsplash API key to the `.env` file in the root directory:
     ```env
     VITE_UNSPLASH_ACCESS_KEY=your_access_key_here
     ```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
