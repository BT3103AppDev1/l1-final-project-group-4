<script setup>
import TheHeader from '@/components/TheHeader.vue'

</script>

<template>
  <main>
    <div id = "group-of-dogs-background">
      <TheHeader />

      <div><h1>The World's Best Team for Pet Care Services </h1> </div><br> 
      <p> We cater to all your pet needs, such as wellness, consultations, grooming and nutrition</p>

    </div>
  </main>
</template>

<style scoped>


h1 {
  font-size: 55px;
  margin: auto;
  padding-top: 20px;
  color: var(--vt-c-darkblue);
  text-align: center;
  font-family: sans-serif;
  width: 80%;
  height: 10%;
}
p {
  font-size: 15px;
  margin: auto;
  color: var(--vt-c-darkblue);
  text-align: center;
  font-family: sans-serif;
  width: 60%;
  font-weight: bold;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

  #group-of-dogs-background {
    background-image: url(@/assets/dogs.jpg);
    background-size:contain;
    background-repeat: no-repeat;
    background-position: bottom;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

</style>
