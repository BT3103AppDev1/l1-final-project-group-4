<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
    name: "ServiceCard",
    props: {
        imageSrc: String,
        serviceName: String
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
    <div class="card">
        <div id="card-header">
            <img id="logo" :src="imageSrc" >
            <h2>{{ serviceName }}</h2>
        </div>
        <div id="card-body">
            <slot></slot>
        </div>
            <router-link to="/bookappointment" v-if="authIsReady"><h3>Get Service &#x2794;</h3></router-link>
            <router-link to="/login" v-if="!authIsReady"><h3>Get Service &#x2794;</h3></router-link>
    </div>

</template>

<style scoped>

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

</style>