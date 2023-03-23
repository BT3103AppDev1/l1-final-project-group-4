<script>
import app from '../firebase.js'
import { onMounted } from "vue"
import { getFirestore } from 'firebase/firestore'
import { doc, getDoc } from 'firebase/firestore'
import { useStore } from 'vuex'


export default {
  setup() {
    const db = getFirestore(app)
    const store = useStore()

    console.log("READ USEREMAIL")
    const userEmail = store.state.userEmail
    console.log(userEmail)
    console.log("DONE READING")
    onMounted(async () => {
      console.log(userEmail)
      const docRef = doc(db, 'customers', userEmail)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data())
        let documentData = docSnap.data()
        let name = documentData.customer_name
        let email = documentData.customer_email
        let phone = documentData.customer_phone

        document.getElementById('customer_name').innerHTML = name
        document.getElementById('customer_email').innerHTML = 'Email: ' + email
        document.getElementById('customer_phone').innerHTML = 'Phone Number: ' + phone
      } else {
        console.log('No such document!')
      }
    })
  
    return { userEmail }
  }
}
</script>

<template>
  <div class="card">
    <div class="card-body">
      <img
        class="card-profile-img"
        src="https://therichpost.com/wp-content/uploads/2021/03/avatar2.png"
        alt="Profile Picture"
      />
      <h2 id="customer_name" >Name:</h2>
      <h3 id="customer_email">Email:</h3>
      <h3 id="customer_phone">Phone Number:</h3>
      <button>Information</button>
      <button>Appointments</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background-color: #fff;
  background-clip: border-box;
  border: none;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  border-radius: 1rem;
}

.card-profile-img {
  position: relative;
  max-width: 15rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  border: 3px solid #fff;
  border-radius: 100%;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  z-index: 2;
}

.card-body {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background-color: #fff;
  background-clip: border-box;
  border: none;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  border-radius: 1rem;
}
</style>
