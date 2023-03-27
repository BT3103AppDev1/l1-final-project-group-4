<script>
import app from '../firebase.js'
import { getFirestore } from 'firebase/firestore'
import { doc, collection, getDocs, deleteDoc } from 'firebase/firestore'
import { useStore } from 'vuex'

export default {
  setup() {
    const db = getFirestore(app)
    const store = useStore()

    const userEmail = store.state.userEmail
    async function display() {
      const docRef = doc(db, 'customers', userEmail)
      const querySnapshot = await getDocs(collection(docRef, 'dogs'))

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, ' => ', doc.data())
        let documentData = doc.data()
        let dogId = doc.id
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

        let deleteButton = document.createElement('button')
        deleteButton.id = String(dogId)
        deleteButton.className = 'bwt-small'
        deleteButton.innerHTML = 'Delete'
        div1.appendChild(deleteButton)
        deleteButton.onclick = function () {
          deleteDog(String(dogId), String(dogName))
        }
      })
    }
    display()

    async function deleteDog(dogId, dogName) {
      alert('You are going to delete ' + dogName)
      const docRef = doc(db, 'customers/' + userEmail + '/dogs', dogId)
      await deleteDoc(docRef)
      console.log('Document successfully deleted!', dogName)
      let tb = document.getElementById('table')
      while (tb.rows.length > 0) {
        tb.deleteRow(0)
      }
      display()
    }

    return { userEmail }
  }
}
</script>

<template>
  <div class="container">
    <div id="dog-profile-cards">
      <table id="table" class="auto-index"></table>
    </div>
    <button class="bwt">Edit dog information</button>
  </div>
</template>

<style>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 22px;
}

#dog-profile-cards {
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  border: 1px solid red;
}

#dog-info {
  height: 93%;
  border: 1px solid green;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

#card-profile-img {
  height: 180px;
  padding-left: 30px;
  padding-top: 15px;
  border: 1px solid red;
}
#dog-details {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-left: 20px;
  border: 1px solid red;
}

h3 {
  margin-bottom: 10px; /* Customize this value to adjust the spacing */
  color: white;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

table {
  table-layout: fixed;
  overflow-x: auto;
}

tr {
  display: block;
  float: left;
}

th,
td {
  display: block;
  border: 1px solid black;
  width: 350px;
  overflow: hidden;
}

.bwt {
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

.bwt:hover {
  opacity: 0.9;
}

.bwt-small {
}
</style>
