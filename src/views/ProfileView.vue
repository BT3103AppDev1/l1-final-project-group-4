<script>
import TheHeader from '@/components/TheHeader.vue'
import ProfileCard from '@/components/ProfileCard.vue'
import DogProfileCard from '@/components/DogProfileCard.vue'
import MyProfile from '@/components/MyProfile.vue'
import app from '../firebase.js'
import { collection, addDoc, getFirestore } from 'firebase/firestore'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  components: {
    TheHeader,
    ProfileCard,
    DogProfileCard,
    MyProfile
  },
  setup() {
    const errorMsg = ref(null)
    const store = useStore()
    const router = useRouter()
    const db = getFirestore(app)

    const email = store.state.userEmail

    const createDoggo = async () => {
      console.log("runs")
      console.log(email)
      const docRef = await addDoc(collection(db, "customers", email, "dogs"), {
        dog_name: "Jodi",
        dog_breed: "Chihuahua",
        dog_dob: Date.now(),
        dog_sex: "F"
      });
      console.log("Document written with ID: ", docRef.id);
    }

    const handleSubmit = async () => {
      try {
        await store.dispatch('logOut')
        router.push('/')
      } catch (err) {
        errorMsg.value = err.message
      }
    }
    return { handleSubmit, createDoggo }
  }
}
</script>

<template>
  <TheHeader />
  <div class="main">
    <div class="flexbox">
      <div class="profile-toggle">
        <div>
          <ProfileCard />
          <br />
          <button class="btn" id="info-page">Information</button>

          <br />
          <router-link style="text-decoration: none; color: inherit" to="/groomingprogress">
            <button class="btn" id="progress-page">Dog Progress</button>
          </router-link>
          <br />
          <button class="btn" id="log-out" @click="handleSubmit()">Log Out</button>
        </div>
      </div>

      <div class="profile-info">
        <div class="profile-info-box">
          <div class="dog-info">
            <DogProfileCard />
          </div>

          <div class="my-info">
            <MyProfile />
          </div>
          <button id="edit-my-info" @click="createDoggo()">Edit my information</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  min-width: 1000px;
  min-height: 600px;
  background-color: rgb(215, 229, 243);
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
}

.flexbox {
  display: flex;
  flex-direction: row;
}

.profile-toggle {
  flex: 1;
  display: flex;
  justify-content: center;
}

.profile-info {
  flex: 4;
  display: flex;
  justify-content: center;
  padding-top: 40px;
  height: 100vh;
}

.profile-info-box {
  display: flex;
  flex-direction: column;
  height: 80%;
  width: 95%;
  background-color: #2c5b94;
  border-radius: 20px;
}

.dog-info {
  display: flex;
  flex-direction: row;
  padding-top: 22px;
}

.my-info {
  flex: 1;
  display: flex;
}

#edit-my-info {
  background-color: rgb(215, 229, 243);
  color: #2c5b94;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* change font */
  font-size: 1.2em;
  font-weight: bold;
  padding: 10px;
  border-radius: 10px;
  border: none;
  display: block;
  margin-left: 50px;
  margin-top: 20px;
  margin-bottom: 40px;
  width: 90%;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
  transition: opacity 0.2s ease-in-out;
}

#edit-my-info:hover {
  opacity: 0.9;
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
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.4);
  transition: opacity 0.2s ease-in-out;
}

.btn:hover {
  opacity: 0.9;
}
</style>
