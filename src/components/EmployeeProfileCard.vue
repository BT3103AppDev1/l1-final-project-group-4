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

        let td1 = document.createElement('td')
        tr.appendChild(td1)

        let div1 = document.createElement('div')
        div1.id = 'employee-info'
        td1.appendChild(div1)

        let imgDiv = document.createElement('div')
        imgDiv.id = 'employee-img'
        div1.appendChild(imgDiv)

        let img = document.createElement('img')
        img.id = 'employee-profile-img'
        img.src = '/assets/avatar2.png'
        img.width = 100
        img.height = 100
        imgDiv.appendChild(img)

        let td2 = document.createElement('td')
        tr.appendChild(td2)

        let header1 = document.createElement('h3')
        header1.id = 'employee-name'
        td2.appendChild(header1)
        header1.innerHTML = 'Name: ' + employeeName

        let header2 = document.createElement('h3')
        header2.id = 'employee-fulltime'
        td2.appendChild(header2)
        header2.innerHTML = employeeFullTime

        let deleteButton = document.createElement('button')
        deleteButton.className = 'bwt-small'
        deleteButton.innerHTML = 'Delete'
        deleteButton.dataset.employeeId = doc.id // add the document ID as a data attribute
        div1.appendChild(deleteButton)
        deleteButton.onclick = function () {
          deleteEmployee(doc.id) // pass the document ID as parameter to the delete function
        }
      })
    }
    display()
    async function deleteEmployee(employeeId) {
      alert('You are going to delete employee with ID ' + employeeId)
      const docRef = doc(db, 'employees', employeeId) // use the document ID to create the document reference
      await deleteDoc(docRef)
      console.log('Document successfully deleted!', employeeId)

      // remove the row from the HTML table
      let row = document.querySelector(`[data-employee-id="${employeeId}"]`).closest('tr')
      row.remove()
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
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: space-between;
  margin-left: auto;
}

#employee-profile-cards {
  display: flex-start;
  flex-direction: column;
  border: 5px solid green;
  height: 80vh;
  overflow: scroll;

}

h3 {
  color: black;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#employee-table {
  overflow: auto;
}

#employee-table tr:nth-child(odd) {
  background-color: lightgray;
}

#employee-table tr:nth-child(even) {
  background-color: #D4E5F3;
}
</style>
