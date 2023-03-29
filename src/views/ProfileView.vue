<script>
import TheHeader from '@/components/TheHeader.vue'
import ProfileCard from '@/components/ProfileCard.vue'
import DogProfileCard from '@/components/DogProfileCard.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import app from '../firebase.js'
import { getFirestore } from 'firebase/firestore'
import { collection, addDoc } from 'firebase/firestore'

export default {
  components: {
    TheHeader,
    ProfileCard,
    DogProfileCard
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
  <div class="main">
    <TheHeader /> 
    <div class="profile-body">
  
        <div class="profile-toggle">
          <div>
          <ProfileCard />
          <br>
          <router-link style="text-decoration: none; color: inherit" to="/groomingprogress">
            <button class="btn" id="progress-page">Dog Progress</button>
          </router-link>
          <br>
          <button class="btn" id="log-out" @click="handleSubmit()">Log Out</button>
          
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
  display: flex;
  height: 100vh;
  
}

.profile-body {
  background-color: rgb(215, 229, 243);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%; 
  display:flex;
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
  padding-top: 40px;
}
.profile-info-box {
  width: 95%;
  height: 95%;
  background-color: #2c5b94;
  border-radius: 20px;
  overflow-y: auto;
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
</style>
