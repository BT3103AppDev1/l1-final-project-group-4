<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from "vue-router"

export default {
  setup() {
    const router = useRouter()
    const store = useStore()
    const errorMsg = ref(null)

    const handleSubmit = async () => {
      try {
        await store.dispatch('logOut')
        router.push('/')
      } catch (err) {
        errorMsg.value = err.message
      }
    }

    return {
      user: computed(() => store.state.user),
      authIsReady: computed(() => store.state.authIsReady),
      handleSubmit
    }
  }
}
</script>

<template>
    <div class="container" v-if="authIsReady">
        <div id="admin">
            <h3>ADMINISTRATOR</h3>
        </div>
        <nav>        
            <div id="buttons">
                <router-link class = "headerButton" to="/admin/scheduler">
                    <h3>SCHEDULER</h3>
                </router-link>

                <router-link class = "headerButton" to="/admin/manpower">
                    <h3>MANPOWER</h3>
                </router-link>

                <router-link class = "headerButton" to="/admin/leave">
                    <h3>LEAVES</h3>
                </router-link>
            </div>
        </nav>
        <div id="logout">
            <button class="logoutButton" @click="handleSubmit()">LOGOUT</button>
        </div>
    </div>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css?family=Nunito');

.container {
    display: flex;
    flex-direction: row;
    background-color: #193a6a;
    color: white;
    text-align: center;
    height: 4em;
    justify-content: space-between;
    width: 100vw;
    padding-inline: 2em;
    align-items: center;
}
nav {
    display: flex;
    font-family: 'Nunito', sans-serif;
    font-size: 1em;
    /* background-color: #193a6a; */
    color: white;
    flex-direction: row;
}
nav a.router-link-exact-active h3 {
  border-bottom: 0.2em solid #64cad8;
}
#buttons {
    display: flex;
    flex-direction: row;
}
.headerButton {
    margin-inline: 3em;
    text-decoration: none;
    color: white;
}
#logout {
    font-family: 'Nunito', sans-serif;
    font-size: 1em;
    color: white;
}
.logoutButton {
    padding: 0.5em 1em;
    background-color: white;
    border-radius: 0.5em;
}
.logoutButton:hover {
    background-color: rgb(230, 230, 230);
    color: #193a6a;
    font-weight: bolder;
    padding: 0.5em 1em;
    border-radius: 0.5em;
    transition: 0.2s;
}
@media (min-width: 1025px) {
  .drawer {
    display: none;
  }
}
@media (max-width: 1024px) {
  nav {
    display: none;
  }
}
</style>
