<template>
<!-- HEADER IF NOT LOGGED IN -->
  <div class="not-logged-in-header" v-if="!loggedIn">
    <div class = "logo-section">
        <img id = "logo" src="@/assets/food.png" />
    </div>
    <div class = "buttons-section">
        <RouterLink to = "/" > <button> HOME </button> </RouterLink>

        <RouterLink to = "/about" custom v-slot= "{ navigate }">
          <button @click = "navigate" role = "link" id = "about-us-button"> ABOUT US </button>
        </RouterLink>

        <RouterLink to = "/services" custom v-slot= "{ navigate }">
          <button @click = "navigate" role = "link" id = "services-button"> SERVICES </button>
        </RouterLink>

        <RouterLink to = "/login" custom v-slot= "{ navigate }">
          <button @click = "navigate" role = "link" id = "login-button"> LOGIN </button>
        </RouterLink>
    </div>
  </div>

<!-- HEADER IF LOGGED IN -->
  <div class="logged-in-header" v-if="loggedIn">
    <div class = "logo-section">
        <img id = "logo" src="@/assets/food.png" />
    </div>
    <div class = "buttons-section">
        <RouterLink to = "/" > <button> HOME </button> </RouterLink>

        <RouterLink to = "/about" custom v-slot= "{ navigate }">
          <button @click = "navigate" role = "link" id = "about-us-button"> ABOUT US </button>
        </RouterLink>

        <RouterLink to = "/services" custom v-slot= "{ navigate }">
          <button @click = "navigate" role = "link" id = "services-button"> SERVICES </button>
        </RouterLink>

        <RouterLink to = "/bookappointment" custom v-slot= "{ navigate }">
          <button @click = "navigate" role = "link" id = "login-button"> BOOK AN APPOINTMENT </button>
        </RouterLink>

        <RouterLink to = "/profile" custom v-slot= "{ navigate }">
          <button @click = "navigate" role = "link" id = "profile-button"> PROFILE </button>
        </RouterLink>
    </div>
  </div>  
</template>

<script>
  export default {
    data() {
      return {
        loggedIn: false
      }
    },
    mounted() {
      this.loggedIn = checkLoginStatus();
    }
  }

  function checkLoginStatus() { //type of header shown will change based on this function???? if thats possible???
    return true;
  }

</script>

<style scoped>

.logged-in-header, .not-logged-in-header {
    display: flex;
    flex-direction: row;
    height: 100px;
    align-items: center;
}

.logo-section {
    flex: 1;
}

#logo {
    height: 100px;
    width: 100px;
    display: inline-block;
    text-align: left;
}

</style>
