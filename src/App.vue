<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  document.title = 'Paws & Pampers';
  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = 'http://clipart-library.com/images/8czno86ji.png';
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
