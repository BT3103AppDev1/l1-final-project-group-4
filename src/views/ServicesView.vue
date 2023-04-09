<script>
import TheHeader from '@/components/TheHeader.vue';
// import { RouterLink } from 'vue-router';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    TheHeader
  },
  setup() {
    const store = useStore();

    return {
      user: computed(() => store.state.user),
      authIsReady: computed(() => store.state.user != null)
    };
  }
};
</script>

<template>
  <div class="main">
    <TheHeader />
    <div id="body">
      <div class="services">
        <h1>Our Pet Care Services</h1>
      </div>
      <div class="cards">
        <div id="row">
          <!-- CARD 1 -->
          <div class="card">
            <div id="card-header">
              <img id="logo" src="@/assets/grooming.png" />
              <h2>Basic Grooming</h2>
            </div>
            <div id="card-body">
              Professional Pet Groomers with magical hands for your pets. We provide bathing,
              cleaning, haircuts, nail trimming and medicated bath to make your dog look smart and
              healthy.
              <br /><br />
              <strong>Price:</strong> From $55 (Toy), $65 (S), $75 (M)
            </div>
            <router-link to="/bookappointment" v-if="authIsReady" id="getService">
              <h3>Get Service &#x2794;</h3>
            </router-link>
            <router-link to="/login" v-if="!authIsReady" id="getService"
              ><h3>Get Service &#x2794;</h3></router-link
            >
          </div>
          <!-- CARD 2 -->
          <div class="card">
            <div id="card-header">
              <img id="logo" src="@/assets/full-grooming.png" />
              <h2>Full Grooming</h2>
            </div>
            <div id="card-body">
              For our full grooming services, we have 2 different cuts available and all basic
              grooming will be covered.
              <br /><br />
              <ol>
                <li>Puppy Cut</li>
                <ul>
                  <li><strong>From:</strong> $85 (Toy), $95 (S), $105(M)</li>
                </ul>
                <li>Teddy Bear Cut</li>
                <ul>
                  <li><strong>From:</strong> $120 (Toy), $130 (S), $160 (M)</li>
                </ul>
              </ol>
            </div>
            <router-link to="/bookappointment" v-if="authIsReady" id="getService">
              <h3>Get Service &#x2794;</h3>
            </router-link>
            <router-link to="/login" v-if="!authIsReady" id="getService"
              ><h3>Get Service &#x2794;</h3></router-link
            >
          </div>
        </div>
        <div id="row">
          <!-- CARD 3 -->
          <div class="card">
            <div id="card-header">
              <img id="logo" src="@/assets/brush-teeth.png" />
              <h2>Teeth Cleaning</h2>
            </div>
            <div id="card-body">
              With the use of an ultrasonic cleaning device and precise handling techniques, our pet
              techs can effectively clean both above & below the gum line and polish while your dog
              remains alert & comfortable.
              <br /><br />
              <strong>Price:</strong> From $80
            </div>
            <router-link to="/bookappointment" v-if="authIsReady" id="getService">
              <h3>Get Service &#x2794;</h3>
            </router-link>
            <router-link to="/login" v-if="!authIsReady" id="getService"
              ><h3>Get Service &#x2794;</h3></router-link
            >
          </div>
          <div class="card">
            <div id="card-header">
              <img id="logo" src="@/assets/dog-spa.png" />
              <h2>Spa Treatment</h2>
            </div>
            <div id="card-body">
              Each spa treatment consists of beneficial properties for your dog:
              <ol>
                <br>
                <li>Japan Nanotechnology Spa Treatment</li>
                <li>Japan Ayurveda Herb Spa Treatment</li>
              </ol>
              <br>
              <strong>Price:</strong> From $45
            </div>
            <router-link to="/bookappointment" v-if="authIsReady" id="getService">
              <h3>Get Service &#x2794;</h3>
            </router-link>
            <router-link to="/login" v-if="!authIsReady" id="getService"
              ><h3>Get Service &#x2794;</h3></router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  height: 100vh;
  display: flex;
  overflow: hidden;
  
}
#body {
  background: url(@/assets/dog1.png) bottom left no-repeat,
    url(@/assets/dog2.png) bottom right no-repeat;
  background-color: #d4e5f3;
  display: flex;
  flex-direction: column;
  height: 100%;
}
#logo {
  border-radius: 25%;
  max-height: 75px;
  max-width: 75px;
  margin: 10px 10px 10px 25px;
}
#row {
  display: flex;
  flex-direction: row;
}
#row:last-child {
  margin-top: 1em;
}
.services {
  display: flex;
  justify-content: center;
}
.services h1 {
  font-weight: bold;
}
.cards {
  display: flex;
  justify-content: center;
  margin: 15px 0;
  padding-inline: 15vw;
  flex-direction: column;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 15px;
  width: 35vw;
  height: 34vh;
  background: white;
  border-radius: 25px;
  border-style: solid;
  border-color: #193a6a;
  border-width: thin;
}
.card:hover {
  background: #193a6a;
  transition: 0.2s;
  color: white;
}
.card h3 {
  margin-left: 20px;
  color: #193a6a;
  font-weight: bold;
}
.card:hover h3 {
  color: #ffda47;
}
.card #logo {
  width: 120px;
}
#card-header {
  margin-top: 0px;
  display: flex;
  text-align: center;
  flex-direction: row;
  align-items: center;
}
#card-header h2 {
  display: flex;
  vertical-align: middle;
  font-weight: bold;
}
#card-body {
  display: flex;
  line-height: 17px;
  margin-inline: 30px;
  text-align: justify;
  flex-direction: column;
  margin-bottom: 1em;
}
#getService {
  margin-bottom: 1em;
}
.services {
  display: flex;
}
.services h1 {
  text-align: center;
  font-size: 40px;
}
</style>
