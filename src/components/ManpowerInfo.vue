<script>
import app from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { ref as vueRef } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import ChangePasswordPopUp from '../components/ChangePasswordPopUp.vue';
import { useStore } from 'vuex';

const storage = getStorage(app);

export default {
  components: {
    ChangePasswordPopUp
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    showPasswordPopup() {
      this.show = true;
    }
  },
  setup() {
    const db = getFirestore(app);
    const store = useStore();
    const name = vueRef('');
    const employmentStatus = vueRef('');

    async function display() {
      const querySnapshot = await getDocs(collection(db, 'employees'));

      querySnapshot.forEach(async function readDoc(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        let documentData = doc.data();
        let employeeName = documentData.name;
        if (employeeName == store.state.userName) {
          name.value = employeeName;
          employmentStatus.value = documentData.fullTime;

          let img = document.getElementById('profilepic');
          await getDownloadURL(ref(storage, 'employee-' + employeeName + '.png')).then((url) => {
            img.setAttribute('src', url);
          });
        }
      });
    }
    display();

    return { name, employmentStatus };
  }
};
</script>

<template>
  <div class="manpowerinfo-container">
    <div class="col1">
      <img class="card-profile-img" id="profilepic" src="@/assets/default-avatar-profile.png" />
      <h3 class="profile-info" id="profile-name">Name: {{ name }}</h3>
      <button class="btn" id="change-pw" @click="showPasswordPopup()">Change Password</button>
      <ChangePasswordPopUp v-model="show" />
    </div>
    <div class="col2">
      <h3 class="profile-info" id="profile-status">Status: {{ employmentStatus }}</h3>
    </div>
  </div>
</template>

<style scoped>
.manpowerinfo-container {
  width: 95%;
  height: 80vh;
  background-color: #193a6a;
  border-radius: 20px;
  margin: auto;
  flex-direction: row;
  justify-content: space-between;
  display: flex;
}
.col1 {
  width: 40%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: green; */
}
.col2 {
  width: 60%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: pink; */
}
#manpower-profile-cards {
  display: flex;
  width: 90%;
  /* margin: auto; */
  /* display: grid; */
  /* grid-template-columns: repeat(auto-fill, minmax(100%, 100%)); */
}
.profile-info {
  color: white;
  font-size: 24px;
  margin: 2%;
}
.card-profile-img {
  height: 200px;
  border-radius: 50%;
  margin: 2%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.btn {
  background-color: #2c5b94;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* change font */
  font-size: 1em;
  font-weight: bold;
  padding: 0.7em 1.2em;
  border-radius: 15px;
  border: none;
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.4);
  transition: opacity 0.2s ease-in-out;
}
</style>
