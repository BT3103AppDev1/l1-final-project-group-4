<script>
import TheHeader from '@/components/TheHeader.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import ServicesCard from '@/components/ServicesCard.vue'

export default {
  components: {
    TheHeader,
    ServicesCard
  },
  setup() {
    const store = useStore()

    return {
      user: computed(() => store.state.user),
      authIsReady: computed(() => store.state.user != null)
    }
  }
}
</script>

<template>
  <main>
    <TheHeader />
    <div id="body">
      <div class="services">
        <h1>Our Pet Care Services</h1>
      </div>
      <div class="cards">
        <ServicesCard serviceName="Basic Grooming" :image-src="'/src/assets/food.png'">
          Professional Pet Groomers with magical hands for your pets. We provide bathing,
          cleaning, haircuts, nail trimming and medicated bath to make your dog look smart and
          healthy.
          <br /><br />
          <strong>Price:</strong> From $55 (Toy), $65 (S), $75 (M)
        </ServicesCard>
        
        <ServicesCard serviceName="Full Grooming" :image-src="'/src/assets/food.png'">
          For our full grooming services, we have 3 different cuts available and all basic
          grooming will be covered.
          <br />
          <ol>
            <li>Puppy Cut</li>
            <ul>
              <li><strong>From:</strong> $85 (Toy), $95 (S), $105(M)</li>
            </ul>
            <li>Teddy Bear Cut</li>
            <ul>
              <li><strong>From:</strong> $120 (Toy), $130 (S), $160 (M)</li>
            </ul>
            <li>Full Scissoring</li>
            <ul>
              <li><strong>From:</strong> $130 (Toy), $160 (S), $180 (M)</li>
            </ul>
          </ol>
        </ServicesCard>
      </div>
      <div class="cards">
        <ServicesCard serviceName="Teeth Cleaning" :image-src="'/src/assets/food.png'">
          With the use of an ultrasonic cleaning device and precise handling techniques, our pet
          techs can effectively clean both above & below the gum line and polish while your dog
          remains alert & comfortable.
          <br /><br />
          <strong>Price:</strong> From $80
        </ServicesCard>

        <ServicesCard serviceName="Spa Cleaning" :image-src="'/src/assets/food.png'">
          Each of the spa treatment consist of beneficial properties for your dog or cat's skin &
            coat:
            <ol>
              <li>Japan Nanotechnology Spa Treatment</li>
              <li>Japan Ayurveda Herb Spa Treatment</li>
              <li>Charcoal Mud Dog Spa Treatment</li>
            </ol>
            <br />
            <strong>Price:</strong> From $45
        </ServicesCard>
      </div>
    </div>
  </main>
</template>

<style scoped>

main {
  height: 100vh;
  width: 100vw;
}
.card-body a {
  width: 50%;
}

#body {
  background: url(@/assets/dog1.png) bottom left no-repeat,
    url(@/assets/dog2.png) bottom right no-repeat;
  background-color: #d4e5f3;
}

#body::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3;
}

.cards,
.services {
  min-width: 1100px;
}

.services h1 {
  font-weight: bold;
}
.cards {
  display: flex;
  height: 350px;
  width: 100%;
  justify-content: center;
  margin: 15px 0;
}

.card h3 {
  position: absolute;
  margin-bottom: 30px;
  margin-left: 20px;
  bottom: 0;
  color: #193a6a;
  white-space: nowrap;
  font-weight: bold;
}

#card-body {
  line-height: 20px;
  margin-left: 30px;
  margin-right: 30px;
  text-align: justify;
  height: 230px;
}
#card-header {
  margin-top: 0px;
  display: flex;
  text-align: center;
}

#card-header h2 {
  display: flex;
  vertical-align: middle;
  height: 120px;
  line-height: 120px;
  font-weight: bold;
}

.card {
  margin: 0 15px;
  width: 500px;
  height: 350px;
  background: white;
  border-radius: 25px;
  border-style: solid;
  border-color: #193a6a;
  border-width: thin;
  position: relative;
}

.card:hover {
  background: #193a6a;
  transition: 0.2s;
  color: white;
}

.card:hover h3 {
  color: #ffda47;
}
.card #logo {
  width: 120px;
}

.services {
  margin-top: 20px;
}
.services h1 {
  text-align: center;
  font-size: 40px;
}
</style>
