<script>
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    const userEmail = store.state.userEmail;
    const userName = store.state.userName;
    const userPhone = store.state.userPhone;

    return { userEmail, userName, userPhone };
  }
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <img class="card-profile-img" src="@/assets/avatar2.png" />
      <br />
      <div class="my-details">
        <h3 id="customer_name">Name: {{ userName }}</h3>
        <h3 id="customer_email">Email: {{ userEmail }}</h3>
        <h3 id="customer_phone">Contact Number: {{ userPhone }}</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.card-profile-img {
  height: 200px;
  border-radius: 50%;
  margin-top: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

#customer_name,
#customer_email,
#customer_phone {
  color: black;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
