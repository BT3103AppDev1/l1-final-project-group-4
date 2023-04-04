<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    var drawerVisible = ref(false);

    return {
      user: computed(() => store.state.user),
      authIsReady: computed(() => store.state.authIsReady),
      drawerVisible
    };
  }
};
</script>

<template>
  <div class="container" v-if="authIsReady">
    <div class="logo-nav-container">
      <img alt="Elsa" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      <nav class="TheHeader">
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
        <router-link class="headerButton" to="/myappointments" v-if="user">
          <text class="navButton">MY APPOINTMENTS</text>
        </router-link>

        <!-- HEADER IF LOGGED IN -->
        <router-link class="headerButton" to="/profile" v-if="user">
          <text class="navButton">PROFILE</text>
        </router-link>
      </nav>

      <img
        alt="Menu"
        class="drawer"
        src="@/assets/drawer.png"
        width="75"
        height="75"
        @click="drawerVisible = true"
      />
      <div
        class="right-drawer"
        :style="{
          width: drawerVisible ? '20vw' : '0',
          paddingLeft: drawerVisible ? '10px' : '0'
        }"
      >
        <router-link class="headerButtonDrawer" to="/">
          <text class="navButtonDrawer">HOME</text>
        </router-link>

        <router-link class="headerButtonDrawer" to="/about">
          <text class="navButtonDrawer">ABOUT US</text>
        </router-link>

        <router-link class="headerButtonDrawer" to="/services">
          <text class="navButtonDrawer">SERVICES</text>
        </router-link>

        <!-- HEADER IF NOT LOGGED IN -->
        <router-link class="headerButtonDrawer" to="/login" v-if="!user">
          <text class="navButtonDrawer">LOGIN</text>
        </router-link>

        <!-- HEADER IF LOGGED IN -->
        <router-link class="headerButtonDrawer" to="/myappointments" v-if="user">
          <text class="navButtonDrawer">MY APPOINTMENTS</text>
        </router-link>

        <!-- HEADER IF LOGGED IN -->
        <router-link class="headerButtonDrawer" to="/profile" v-if="user">
          <text class="navButtonDrawer">PROFILE</text>
        </router-link>

        <div style="text-align: right; margin: 5px"></div>
      </div>
      <div
        class="drawer-mask"
        :style="{
          width: drawerVisible ? '100vw' : '0',
          opacity: drawerVisible ? '0.6' : '0'
        }"
        @click="drawerVisible = false"
      ></div>
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

.headerButtonDrawer {
  margin-inline: 3em;
  margin-block: 2em;
  text-align: center;
}

.logo-nav-container {
  line-height: 1.5;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

nav.TheHeader {
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

nav.TheHeader a:hover {
  background-color: #2c5b94;
  transition: 0.2s;
}

nav.TheHeader a.router-link-exact-active:hover {
  background-color: #193a6a;
}

.navButton {
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* change font */
  font-size: 1em;
  font-weight: bold;
  padding: 0.5em 1.2em;
}

.navButtonDrawer {
  display: flex;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* change font */
  font-size: 0.6em;
  font-weight: bold;
  padding: 0.5em 0.8em;
  width: 10vw;
  justify-content: center;
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
.right-drawer {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  width: 0; /* initially */
  overflow: hidden;
  height: 100vh;
  padding-left: 0; /* initially */
  border-left: 1px solid whitesmoke;
  background: white;
  z-index: 200;
  transition: all 0.2s; /* for the animation */
  flex-direction: column;
  align-items: center;
  background-color: rgb(215, 229, 243);
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
@media (min-width: 1287px) {
  .drawer {
    display: none;
  }
}
@media (max-width: 1286px) {
  nav.TheHeader {
    display: none;
  }
}
</style>
