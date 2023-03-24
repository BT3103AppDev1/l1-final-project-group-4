<script>
import app from '../firebase.js'
import { getAuth } from 'firebase/auth'
const auth = getAuth(app)

import { getFirestore } from 'firebase/firestore'
import { doc, getDoc } from 'firebase/firestore'
const db = getFirestore(app)

export default {
  setup() {
    var user = auth.currentUser
    var userEmail = user.email

    async function getProfile() {
      const docRef = doc(db, 'customers', userEmail)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data())
        let documentData = docSnap.data()
        let name = documentData.customer_name
        let email = documentData.customer_email
        let phone = documentData.customer_phone

        document.getElementById('customer_name').innerHTML = 'Name: ' + name
        document.getElementById('customer_email').innerHTML = 'Email: ' + email
        document.getElementById('customer_phone').innerHTML = 'Contact Number: ' + phone
      } else {
        console.log('No such document!')
        console.log(userEmail)
      }
    }

    getProfile()

    return { user, userEmail }
  }
}
</script>

<template>
  <div class="personal-info">
    <h1>Profile</h1>
    <div class="my-details">
      <h3 id="customer_name">Name: {{ name }}</h3>
      <h3 id="customer_email">Email: {{ email }}</h3>
      <h3 id="customer_phone">Contact Number: {{ contactno }}</h3>
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
