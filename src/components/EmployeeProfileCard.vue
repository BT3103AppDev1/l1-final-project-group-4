<script>
import app from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const storage = getStorage(app);

export default {
  setup() {
    const db = getFirestore(app);

    async function display() {
      const querySnapshot = await getDocs(collection(db, 'employees'));

      querySnapshot.forEach(async function readDoc(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        let documentData = doc.data();
        let employeeName = documentData.name;
        let employeeFullTime = documentData.fullTime;

        let table = document.getElementById('employee-table');
        let tr = document.createElement('tr');
        table.appendChild(tr);

        let td1 = document.createElement('td');
        tr.appendChild(td1);

        let div1 = document.createElement('div');
        div1.id = 'employee-info';
        td1.appendChild(div1);

        let imgDiv = document.createElement('div');
        imgDiv.id = 'employee-img';
        div1.appendChild(imgDiv);

        let img = document.createElement('img');
        await getDownloadURL(ref(storage, 'employee-' + employeeName + '.png')).then((url) => {
          img.setAttribute('src', url);
        });
        img.id = 'employee-profile-img';
        imgDiv.appendChild(img);

        let td2 = document.createElement('td');
        tr.appendChild(td2);

        let header1 = document.createElement('h3');
        header1.id = 'employee-name';
        td2.appendChild(header1);
        header1.innerHTML = employeeName;

        let header2 = document.createElement('h3');
        header2.id = 'employee-fulltime';
        td2.appendChild(header2);
        header2.innerHTML = employeeFullTime;
      });
    }
    display();
  }
};
</script>

<template>
  <div class="container">
    <div id="employee-profile-cards">
      <h3 id="employee-header">Employees</h3>
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

#employee-header {
  color: black;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#employee-profile-cards {
  display: flex-start;
  flex-direction: column;
  border: 5px solid green;
  height: 80vh;
  overflow: scroll;
  color: black;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#employee-name {
  font-weight: bold;
}

#employee-profile-img {
  height: 150px;
  border-radius: 50%;
  margin: 10px;
}

#employee-table {
  overflow: auto;
}

#employee-table tr:nth-child(odd) {
  background-color: lightgray;
}

#employee-table tr:nth-child(even) {
  background-color: #d4e5f3;
}
</style>
