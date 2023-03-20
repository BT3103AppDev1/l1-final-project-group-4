<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <router-view class="views"/>
</template>

<style scoped>
  .views {
    display: flex;
    flex-direction: column;
  }
</style>
