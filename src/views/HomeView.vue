<script setup>
import TheHeader from '@/components/TheHeader.vue';
</script>

<template>
  <div class="main">
    <TheHeader class="header" />
    <div class="body">
      <h1>The World's Best Team for</h1>
      <h1>Pet Care Services</h1>
      <h2>We cater to all your pet needs such as wellness,</h2>
      <h2>consultations, grooming and nutrition</h2>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  height: 100vh;
}
.body {
  background-image: url('../assets/GroupPortrait.png');
  background-color: rgb(215, 229, 243);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
  text-align: center;
}

h1 {
  font-size: 3em;
  font-weight: bold;
}

h1:last-of-type {
  padding-bottom: 0.2em;
}

h2 {
  font-size: 1em;
}

@media (max-height: 700px) {
  h1 {
    font-size: 2em;
    font-weight: bold;
  }

  h1:last-of-type {
    padding-bottom: 0.2em;
  }

  h2 {
    font-size: 1em;
  }
}

@media (max-height: 640px) {
  h1,
  h2 {
    display: none;
  }
}
</style>
