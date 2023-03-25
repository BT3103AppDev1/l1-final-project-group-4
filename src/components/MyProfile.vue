<script>
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    const userEmail = store.state.userEmail
    const userName = store.state.userName
    const userPhone = store.state.userPhone

    return { userEmail, userName, userPhone }
  }
}
</script>

<template>
  <div class="personal-info">
    <h1>Profile</h1>
    <div class="my-details">
      <h3 id="customer_name">Name: {{ userName }}</h3>
      <h3 id="customer_email">Email: {{ userEmail }}</h3>
      <h3 id="customer_phone">Contact Number: {{ userPhone }}</h3>
    </div>
  </div>
</template>

<style scoped>
.personal-info {
  padding-left: 20px;
}
h1 {
  text-decoration: underline;
}
h1,
h3 {
  margin-bottom: 10px;
  color: white;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
