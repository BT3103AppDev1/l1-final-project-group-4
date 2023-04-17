<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  document.title = 'Paws & Pampers';
  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = 'https://upload.wikimedia.org/wikipedia/commons/5/51/Paw-print.svg';
  document.head.appendChild(link);
});
</script>

<template>
  <router-view class="views" />
</template>

<style scoped>
.views {
  display: flex;
  flex-direction: column;
}
</style>
