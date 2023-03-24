<script setup>
import TheHeader from '@/components/TheHeader.vue'
</script>

<template>
  <main>
    <TheHeader />

    <div class="GroomingProgress">
      <h1>Track your pet's grooming progress!</h1>

    <div class="columns">
      <div class="bath completed">
        <h2>Bath</h2>
      </div>


      <div class="cut in-progress">
        <h2>Cut</h2>
      </div>
      
      <div class="groom">
        <h2>Groom</h2>
      </div>
      </div>

    </div>
  </main>
</template>

<style scoped>
.GroomingProgress {
  height: calc(100vh - 125px);
  background-color: #d4e5f3;
}

h1 {
  font-size: 3em;
  font-weight: bold;
  margin-left: 20px;
  color: #193a6a;
}

h2 {
  font-size: 2em;
  font-weight: bold;
  margin-left: 20px;
  color: #d4e5f3;
}
.columns {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.bath {
  flex: 20%;
  height: 400px;
  padding: 10px;
  margin: 50px;
  background-color: white;
  border-radius: 25px;
  background-image: url('../assets/DogBath.png');
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center;
}
.cut {
  flex: 20%;
  height: 400px;
  padding: 10px;
  margin: 50px;
  background-color: white;
  border-radius: 25px;
  background-image: url('../assets/DogCut.png');
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center;
}
.groom {
  flex: 20%;
  height: 400px;
  padding: 10px;
  margin: 50px;
  background-color: white;
  border-radius: 25px;
  background-image: url('../assets/DogGroom.png');
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center; 
}

.in-progress{
  background-color:#193A6A;
  opacity: 60%
}

.completed {
  background-color:#193A6A;
  opacity: 100%;
}
</style>