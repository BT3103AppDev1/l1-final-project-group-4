<script>
import app from '../firebase.js'
import { onMounted } from 'vue'
import { getFirestore } from 'firebase/firestore'
import { doc, collection, getDocs } from 'firebase/firestore'
import { useStore } from 'vuex'

export default {
  setup() {
    const db = getFirestore(app)
    const store = useStore()

    const userEmail = store.state.userEmail
    onMounted(async () => {
      const docRef = doc(db, 'customers', userEmail)
      const querySnapshot = await getDocs(collection(docRef, 'dogs'))

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, ' => ', doc.data())
        let documentData = doc.data()
        let dogName = documentData.dog_name
        let dogSex = documentData.dog_sex
        let dogDob = documentData.dog_dob.toDate().toLocaleDateString('en-GB')
        let dogBreed = documentData.dog_breed

        let table = document.getElementById('table')
        let tr = document.createElement('tr')
        table.appendChild(tr)
        let td = document.createElement('td')
        tr.appendChild(td)

        let div1 = document.createElement('div')
        div1.id = 'dog-info'
        td.appendChild(div1)

        let img = document.createElement('img')
        img.id = 'card-profile-img'
        img.src =
          '@https://images.unsplash.com/photo-1611003228941-98852ba62227?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFieSUyMGRvZ3xlbnwwfHwwfHw%3D&w=1000&q=80'
        div1.appendChild(img)

        let div2 = document.createElement('div')
        div2.id = 'dog-details'
        div1.appendChild(div2)

        let header1 = document.createElement('h3')
        header1.id = 'dog-name'
        div2.appendChild(header1)
        header1.innerHTML = 'Name: ' + dogName

        let header2 = document.createElement('h3')
        header2.id = 'dog-sex'
        div2.appendChild(header2)
        header2.innerHTML = 'Sex: ' + dogSex

        let header3 = document.createElement('h3')
        header3.id = 'dog-dob'
        div2.appendChild(header3)
        header3.innerHTML = 'DOB: ' + dogDob

        let header4 = document.createElement('h3')
        header4.id = 'dog-breed'
        div2.appendChild(header4)
        header4.innerHTML = 'Breed: ' + dogBreed
      })
    })

    return { userEmail }
  }
}
</script>

<template>
  <table id="table" class="auto-index"></table>
</template>

<style>
.dog-info {
  height: 93%;
}

.card-profile-img {
  height: 180px;
  padding-left: 30px;
  padding-top: 15px;
}
.dog-details {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-left: 20px;
}

h3 {
  margin-bottom: 10px; /* Customize this value to adjust the spacing */
  color: white;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

table {
  overflow-x: auto;
}
tr {
  display: block;
  float: left;
}

th,
td {
  display: block;
}
</style>
