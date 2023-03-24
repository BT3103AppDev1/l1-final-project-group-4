<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    return {
      user: computed(() => store.state.user),
      authIsReady: computed(() => store.state.authIsReady)
    }
  }
}
</script>

<template>
  <!-- HEADER IF NOT LOGGED IN -->
  <div class="container" v-if="authIsReady">
    <div class="logo-nav-container">
      <img alt="Elsa" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      <nav>
        <router-link class="headerButton" to="/">
          <text class="navButton">HOME</text>
        </router-link>

        <router-link class="headerButton" to="/about">
          <text class="navButton">ABOUT US</text>
        </router-link>

        <router-link class="headerButton" to="/services">
          <text class="navButton">SERVICES</text>
        </router-link>

        <!-- HEADER IF NOT LOGGED IN -->
        <router-link class="headerButton" to="/login" v-if="!user">
          <text class="navButton">LOGIN</text>
        </router-link>

        <!-- HEADER IF LOGGED IN -->
        <router-link class="headerButton" to="/bookappointment" v-if="user">
          <text class="navButton">BOOK APPOINTMENT</text>
        </router-link>

        <!-- HEADER IF LOGGED IN -->
        <router-link class="headerButton" to="/profile" v-if="user">
          <text class="navButton">PROFILE</text>
        </router-link>
      </nav>
      <img alt="Menu" class="drawer" src="@/assets/drawer.png" width="75" height="75" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  background-color: white;
}

.headerButton {
  margin-inline: 3em;
}

.logo-nav-container {
  line-height: 1.5;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

a {
  text-decoration: none;
  background-color: #193a6a;
  padding: 0.5em;
  border-radius: 0.5em;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

nav a:hover {
  background-color: #2c5b94;
  transition: 0.2s;
}

nav a.router-link-exact-active:hover {
  background-color: #193a6a;
}

.navButton {
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* change font */
  font-size: 1em;
  font-weight: bold;
  padding: 0.5em 1.2em;
}

.logo {
  display: flex;
  margin: 0em 0em 0em 1em;
}

.drawer {
  margin: 0em 2em 0em 0em;
}

.header h1 {
  flex: 1 0 auto;
  text-align: center;
  margin: 0 10px;
  padding-inline: 100px;
  padding-top: 2em;
  align-self: center;
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
