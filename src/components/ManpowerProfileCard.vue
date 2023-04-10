<script>
import app from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { doc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import AddManpowerPopUp from '@/components/AddManpowerPopUp.vue';
import { getStorage, ref, getDownloadURL, deleteObject } from 'firebase/storage';

const storage = getStorage(app);

export default {
  components: {
    AddManpowerPopUp
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    showAddManpowerPopUp() {
      this.show = true;
    }
  },
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

        let table = document.getElementById('manpower-table');
        let tr = document.createElement('tr');
        table.appendChild(tr);
        let td = document.createElement('td');
        tr.appendChild(td);

        let div1 = document.createElement('div');
        div1.id = 'manpower-info';
        td.appendChild(div1);

        let img = document.createElement('img');
        await getDownloadURL(ref(storage, 'employee-' + employeeName + '.png')).then((url) => {
          img.setAttribute('src', url);
        });
        img.id = 'employee-img';
        div1.appendChild(img);

        let div2 = document.createElement('div');
        div2.id = 'manpower-details';
        div1.appendChild(div2);

        let header1 = document.createElement('h3');
        header1.id = 'manpower-name';
        div2.appendChild(header1);
        header1.innerHTML = employeeName;

        let header2 = document.createElement('h3');
        header2.id = 'manpower-fulltime';
        div2.appendChild(header2);
        header2.innerHTML = employeeFullTime;

        let deleteButton = document.createElement('button');
        deleteButton.className = 'bwt-small';
        deleteButton.innerHTML = 'x';
        deleteButton.dataset.employeeId = doc.id; // add the document ID as a data attribute
        div1.appendChild(deleteButton);
        deleteButton.onclick = function () {
          deleteEmployee(doc.id, employeeName); // pass the document ID as parameter to the delete function
        };
      });
    }
    display();

    async function deleteEmployee(employeeId, employeeName) {
      alert('You are going to delete employee: ' + employeeName);
      const docRef = doc(db, 'employees', employeeId); // use the document ID to create the document reference
      await deleteDoc(docRef);
      const imgRef = ref(storage, 'employee-' + employeeName + '.png');
      // Delete the file
      await deleteObject(imgRef);
      console.log('Document successfully deleted!', employeeId);

      // remove the row from the HTML table
      let row = document.querySelector(`[data-employee-id="${employeeId}"]`).closest('tr');
      row.remove();
    }

    async function refresh() {
      let tb = document.getElementById('manpower-table');
      while (tb.rows.length > 0) {
        tb.deleteRow(0);
      }
      display();
    }
    return { display, refresh };
  }
};
</script>

<template>
  <div class="container-manpowerprofilecard">
    <button class="bwt" @click="showAddManpowerPopUp">Add Employee</button>
    <AddManpowerPopUp v-model="show" @update:modelValue="refresh"></AddManpowerPopUp>
  </div>
  <div id="manpower-profile-cards">
    <table id="manpower-table" class="auto-index"></table>
  </div>
</template>

<style>
.container-manpowerprofilecard {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 22px;
}

#manpower-profile-cards {
  width: 90%;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100%, 100%));
}

#manpower-info {
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: rgb(215, 229, 243);
  border-radius: 20px;
  color: #2c5b94;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#manpower-details {
  flex-grow: 1;
}

#manpower-profile-img {
  flex-grow: 3;
}

#employee-img {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  margin: 10px;
  margin-right: 20px;
}

#manpower-name {
  padding-top: 10px;
  font-weight: bold;
}

.bwt {
  background-color: rgb(215, 229, 243);
  color: #2c5b94;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.2em;
  font-weight: bold;
  padding: 20px;
  border-radius: 20px;
  border: none;
  margin: 0 auto 40px auto;
  width: 90%;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
  transition: opacity 0.2s ease-in-out;
}

.bwt:hover {
  opacity: 0.9;
}

.bwt-small {
  position: absolute;
  right: -10px;
  top: -5px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background-color: red;
  color: white;
  font-size: 16px;
  font-weight: bold;
  font-size: 23px;
  text-align: center;
  cursor: pointer;
}
</style>
