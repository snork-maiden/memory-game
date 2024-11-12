<template>
  <span class="loader"></span>
</template>

<style scoped>
.loader {
  width:var(--loader-size);
  height:var(--loader-size);
  position: relative;
  margin: auto;
}
.loader::after,
.loader::before {
  content: "";
  box-sizing: border-box;
  width:var(--loader-size);
  height:var(--loader-size);
  border-radius: 50%;
  border: 6px solid var(--color-text);
  position: absolute;
  left: 0;
  top: 0;
  animation: animloader 2s linear infinite;
}
.loader::after {
  animation-delay: 1s;
}

@keyframes animloader {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
