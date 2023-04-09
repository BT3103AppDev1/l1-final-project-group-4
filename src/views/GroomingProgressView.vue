<script>
import TheHeader from '@/components/TheHeader.vue'
import {  useRoute } from 'vue-router';
import { computed } from 'vue';

export default {
  components: {
    TheHeader,
  },
  setup() {
    const route = useRoute()
    const statusBath = computed(() => route.query.statusBath);
    const statusCut = computed(() => route.query.statusCut);
    const statusGroom = computed(() => route.query.statusGroom);

    const isBathing = computed(() => statusBath.value == 1);
    const isCuttingHair = computed(() => statusCut.value == 1);
    const isGrooming = computed(() => statusGroom.value == 1);

    return {
      isBathing,
      isCuttingHair,
      isGrooming,
    }
  }, 
  

}

</script>

<template>
  <main>
    <TheHeader />
    

    <div class="GroomingProgress">
      
      <h1 style="color:#193a6a; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin-left: 1.5em; margin-top: 1em;">
        Track your pet's grooming progress!
      </h1>
      <br>

    <div class="columns">
      <div class="bath completed" :class=" isBathing? 'active' : 'inactive' ">
        <h2>Bath</h2>
      </div>


      <div class="cut in-progress" :class=" isCuttingHair? 'active' : 'inactive' ">
        <h2>Cut</h2>
      </div>
      
      <div class="groom" :class=" isGrooming? 'active' : 'inactive' ">
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
  color: #193a6a;
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
  background-color:#193a6a;
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
  background-color:#193a6a;
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
  background-color:#193a6a;
}

.active {
  box-shadow: 0 0 70px #3679a8;
}
.inactive {
  opacity: 60%
}
</style>