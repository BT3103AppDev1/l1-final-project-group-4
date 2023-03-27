<script>
import app from '../firebase.js'
import { getFirestore } from 'firebase/firestore'
import { doc, collection, getDocs, deleteDoc } from 'firebase/firestore'

export default {
  setup() {
    const db = getFirestore(app)

    async function display() {
      const querySnapshot = await getDocs(collection(db, 'employees'))

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data())
        let documentData = doc.data()
        let employeeName = documentData.name
        let employeeFullTime = documentData.fullTime

        let table = document.getElementById('employee-table')
        let tr = document.createElement('tr')
        table.appendChild(tr)
        let td = document.createElement('td')
        tr.appendChild(td)

        let div1 = document.createElement('div')
        div1.id = 'employee-info'
        td.appendChild(div1)

        let img = document.createElement('img')
        img.id = 'employee-profile-img'
        img.src = 'src/assets/avatar2.png'
        div1.appendChild(img)

        let header1 = document.createElement('h3')
        header1.id = 'employee-name'
        td.appendChild(header1)
        header1.innerHTML = 'Name: ' + employeeName

        let header2 = document.createElement('h3')
        header2.id = 'employee-fulltime'
        td.appendChild(header2)
        header2.innerHTML = employeeFullTime

        let deleteButton = document.createElement('button')
        deleteButton.id = String(employeeName)
        deleteButton.className = 'bwt-small'
        deleteButton.innerHTML = 'Delete'
        div1.appendChild(deleteButton)
        deleteButton.onclick = function () {
          deleteEmployee(String(employeeName))
        }
      })
    }
    display()

    async function deleteEmployee(employeeName) {
      alert('You are going to delete ' + employeeName)
      const docRef = doc(db, employeeName)
      await deleteDoc(docRef)
      console.log('Document successfully deleted!', employeeName)
      let tb = document.getElementById('table')
      while (tb.rows.length > 0) {
        tb.deleteRow(0)
      }
      display()
    }
  }
}
</script>

<template>
  <div class="container">
    <div id="employee-profile-cards">
      <h3>Employees</h3>
      <table id="employee-table" class="auto-index"></table>
    </div>
  </div>
</template>

<style>
.container {
  width: 20%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 75%; 
  padding-top: 22px;
}

#employee-profile-cards {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid green;
}

#employee-profile-img {
  width: 10vw;
  height: 20vh;
}

h3 {
  margin-bottom: 10px;
  color: black;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>