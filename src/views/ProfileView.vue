<script>
import TheHeader from '@/components/TheHeader.vue';
import ProfileCard from '@/components/ProfileCard.vue';
import DogProfileCard from '@/components/DogProfileCard.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ChangePasswordPopUp from '../components/ChangePasswordPopUp.vue';

export default {
  components: {
    TheHeader,
    ProfileCard,
    DogProfileCard,
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
    const errorMsg = ref(null);
    const store = useStore();
    const router = useRouter();

    const handleSubmit = async () => {
      try {
        await store.dispatch('logOut');
        router.push('/');
      } catch (err) {
        errorMsg.value = err.message;
      }
    };
    return { handleSubmit };
  }
};
</script>

<template>
  <div class="main">
    <TheHeader />
    <div class="body">
      <div class="profile-toggle">
        <div>
          <ProfileCard />
          <br />
          <button class="btn" id="change-pw" @click="showPasswordPopup()">Change Password</button>
          <br />
          <button class="btn" id="log-out" @click="handleSubmit()">Log Out</button>
          <ChangePasswordPopUp v-model="show" />
        </div>
      </div>

      <div class="profile-info">
        <div class="profile-info-box">
          <DogProfileCard />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  height: 100vh;
  display: flex;
}

.body {
  display: flex;
  background-color: rgb(215, 229, 243);
  width: 100%;
  height: 100%;
  flex-direction: row;
  /* min-width: 1125px; */
}

.profile-body {
  background-color: rgb(215, 229, 243);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.profile-toggle {
  flex: 2;
  display: flex;
  justify-content: center;
}

.profile-info {
  flex: 3;
  display: flex;
  align-items: flex-start;
  margin-top: 30px;
}
.profile-info-box {
  width: 90%;
  height: 90%;
  background-color: #2c5b94;
  border-radius: 20px;
  overflow-y: auto;
  box-shadow: 0 0 5px #616f82;
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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.4);
  transition: opacity 0.2s ease-in-out;
}
</style>
