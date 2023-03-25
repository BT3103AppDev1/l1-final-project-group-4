<script>
import app from '../firebase.js'

import { onMounted } from 'vue'
import { getFirestore } from 'firebase/firestore'
import { doc, getDoc } from 'firebase/firestore'
import { useStore } from 'vuex'

export default {
  setup() {
    const db = getFirestore(app)
    const store = useStore()

    const userEmail = store.state.userEmail
    onMounted(async () => {
      // console.log(userEmail)
      const docRef = doc(db, 'customers', userEmail)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        // console.log('Document data:', docSnap.data())
        let documentData = docSnap.data()
        let name = documentData.customer_name
        let email = documentData.customer_email
        let phone = documentData.customer_phone

        document.getElementById('customer_name').innerHTML = 'Name: ' + name
        document.getElementById('customer_email').innerHTML = 'Email: ' + email
        document.getElementById('customer_phone').innerHTML = 'Contact Number: ' + phone
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
      <img class="card-profile-img" src="@/assets/appts-img.png" />
      <br />
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
</style>
