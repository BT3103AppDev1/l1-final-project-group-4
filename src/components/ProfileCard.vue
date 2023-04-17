<script>
import { useStore } from 'vuex';
import app from '../firebase.js';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const storage = getStorage(app); // Create a storage instance using the 'getStorage' function from Firebase, passing in the 'app' instance

export default {
  setup() {
    const store = useStore(); // Access the Vuex store using the 'useStore' function

    // Get appropriate properties from the Vuex store's state

    const userEmail = store.state.userEmail;
    const userName = store.state.userName;
    const userPhone = store.state.userPhone;

    getDownloadURL(ref(storage, userEmail + '.png')).then((url) => {
      // Retrieve the image for the profile card
      const img = document.getElementById('profilepic');
      img.setAttribute('src', url);
    });

    return { userEmail, userName, userPhone };
  }
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <img class="card-profile-img" id="profilepic" src="@/assets/default-avatar-profile.png" />
      <br />
      <div class="my-details">
        <h3 id="user_name">Name: {{ userName }}</h3>
        <h3 id="user_email">Email: {{ userEmail }}</h3>
        <h3 id="user_phone">Contact Number: {{ userPhone }}</h3>
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
  object-fit: cover;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  margin-top: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

#user_name,
#user_email,
#user_phone {
  color: black;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
