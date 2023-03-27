<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from "vue-router"

export default {
  setup() {
    const router = useRouter()
    const store = useStore()
    const errorMsg = ref(null)
    var drawerVisible = ref(false)

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
      drawerVisible,
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
      <img alt="Menu" class="drawer" src="@/assets/drawer.png" width="40" height="40" @click="drawerVisible = true"/>
      <div
        class="right-drawer"
        :style="{
          width: drawerVisible? '20vw' : '0',
          paddingLeft: drawerVisible? '10px' : '0',
        }"
        >
          <router-link class = "headerButtonDrawer" to="/admin/scheduler">
              <h3>SCHEDULER</h3>
          </router-link>

          <router-link class = "headerButtonDrawer" to="/admin/manpower">
              <h3>MANPOWER</h3>
          </router-link>

          <router-link class = "headerButtonDrawer" to="/admin/leave">
              <h3>LEAVES</h3>
          </router-link>
          
          <div id="logoutDrawer">
            <button class="logoutButtonDrawer" @click="handleSubmit()">LOGOUT</button>
          </div>
        <div style="text-align:right; margin:5px">
        </div>
      </div>
      <div
        class="drawer-mask"
        :style="{
          width: drawerVisible ? '100vw' : '0',
          opacity: drawerVisible ? '0.6' : '0',
        }"
        @click="drawerVisible = false"
        >
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
    height: 5em;
    justify-content: space-between;
    width: 100vw;
    padding-inline: 2em;
    align-items: center;
}
nav {
    display: flex;
    font-family: 'Nunito', sans-serif;
    font-size: 1em;
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
.headerButtonDrawer {
  margin-inline: 3em;
  margin-block: 2em;
  text-align: center;
  text-decoration: none;
  color: white;
}
#logout {
    font-family: 'Nunito', sans-serif;
    font-size: 1em;
    color: white;
    /* display: flex; */
}
.logoutButton {
    padding: 0.5em 1em;
    background-color: white;
    border-radius: 0.5em;
    display: flex;
    align-items: center;
}
.logoutButtonDrawer {
  margin-top: 1em;
  padding: 0.5em 1em;
  background-color: white;
  border-radius: 0.5em;
  display: flex;
  align-items: center;
}
.logoutButtonDrawer:hover {
  margin-top: 1em;
  padding: 0.5em 1em;
  background-color: rgb(215, 229, 243);
  border-radius: 0.5em;
  display: flex;
  align-items: center;
}

.logoutButton:hover {
    background-color: rgb(230, 230, 230);
    color: #193a6a;
    font-weight: bolder;
    padding: 0.5em 1em;
    border-radius: 0.5em;
    transition: 0.2s;
}
.right-drawer {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  width: 0; /* initially */
  overflow: hidden;
  height: 100vh;
  padding-left: 0; /* initially */
  border-left: 1px solid black;
  background: white;
  z-index: 200;
  transition: all 0.2s; /* for the animation */
  flex-direction: column;
  align-items: center;
  background-color:#193a6a;
}
.drawer-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 0; /* initially */
  height: 100vh;
  background: #000;
  opacity: 0.3;
  z-index: 199;
}
.drawer {
  margin: 0em 2em 0em 0em;
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
  #logout {
    display: none;
  }
}
</style>
