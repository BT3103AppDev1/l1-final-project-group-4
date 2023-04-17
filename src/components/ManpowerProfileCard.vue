<script>
import app from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { doc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import AddManpowerPopUp from '@/components/AddManpowerPopUp.vue';
import { getStorage, ref, getDownloadURL, deleteObject } from 'firebase/storage';
import { ref as vueref, onMounted } from 'vue';
import PopUp from '@/components/PopUp.vue';
import DeletePopUp from '@/components/DeletePopUp.vue';
import LoadingPopUp from '@/components/LoadingPopUp.vue';
import loadingAudio from '../assets/loadingAudio.mp3';

const storage = getStorage(app);

export default {
  components: {
    AddManpowerPopUp,
    PopUp,
    DeletePopUp,
    LoadingPopUp
  },
  setup() {
    const show = vueref(false);
    const showError = vueref(false);
    const errorMessage = vueref('');
    const showDelete = vueref(false);
    const deleteMessage = vueref('');
    // loading popup
    const isLoading = vueref(false);
    const audio = vueref(null);
    const playAudio = () => {
      audio.value.play();
    };
    const pauseAudio = () => {
      audio.value.pause();
    };

    function showAddManpowerPopUp() {
      show.value = true;
    }
    function showErrorPopUp() {
      showError.value = true;
    }
    function showDeletePopUp() {
      showDelete.value = true;
    }

    const db = getFirestore(app);

    // The display() function fetches data from a Firestore collection named 'employees',
    // loop through the documents to create table rows and cells with the retrieved data.
    // Handles deleting employees by calling the deleteEmployee() function and passing the employee ID and name as parameters.
    async function display() {
      isLoading.value = true;

      const querySnapshot = await getDocs(collection(db, 'employees'));

      querySnapshot.forEach(async function readDoc(doc) {
        let documentData = doc.data();
        let employeeName = documentData.name;
        let employeeFullTime = documentData.fullTime;
        let email = documentData.email;
        let phoneNum = documentData.phoneNum;

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

        let header3 = document.createElement('h3');
        header3.id = 'manpower-email';
        div2.appendChild(header3);
        header3.innerHTML = email;

        let header4 = document.createElement('h3');
        header4.id = 'manpower-phoneNum';
        div2.appendChild(header4);
        header4.innerHTML = phoneNum;

        let deleteButton = document.createElement('button');
        deleteButton.className = 'bwt-small';
        deleteButton.innerHTML = 'x';
        deleteButton.dataset.employeeId = doc.id; // add the document ID as a data attribute
        div1.appendChild(deleteButton);
        deleteButton.onclick = function () {
          deleteEmployee(doc.id, employeeName); // pass the document ID as parameter to the delete function
        };
      });
      isLoading.value = false;
      // pauseAudio();
    }

    const appts = vueref([]);

    // The getAppts() function fetches data from 'new-appointments',
    // populates an array named appts with appointment dates that match the groomer name passed as a parameter.
    // It also handles loading state with isLoading ref, and plays/pauses audio with audio ref.
    const getAppts = async (name) => {
      isLoading.value = true;
      playAudio();

      appts.value = [];
      const querySnapshot = await getDocs(collection(db, 'new-appointments'));
      const slotArray = ['s1', 's2', 's3', 's4'];
      const promises = querySnapshot.docs.map(async (docDates) => {
        for (let j = 0; j < slotArray.length; j++) {
          const querySnapshot1 = await getDocs(
            collection(db, 'new-appointments/' + docDates.id + '/' + slotArray[j])
          );
          await Promise.all(
            querySnapshot1.docs.map(async (docc) => {
              let documentData = docc.data();
              let apptDate = documentData.appt_date;

              let groomer = documentData.appt_groomer;
              if (name === groomer) {
                appts.value.push(apptDate);
                console.log(apptDate, ' pushed');
              }
            })
          );
        }
      });
      await Promise.all(promises);
      isLoading.value = false;
      pauseAudio();
    };

    // The deleteEmployee() function handles deleting employees. It checks
    // if the employee has pending appointments by calling the getAppts() function. If there are pending appointments,
    // it displays an error message and calls the showErrorPopUp() function.
    // it calls the showDeletePopUp() function.

    async function deleteEmployee(employeeId, employeeName) {
      deleteMessage.value = 'You are going to delete ' + employeeName;
      await getAppts(employeeName);
      if (appts.value.length > 0) {
        errorMessage.value =
          'Unable to delete. ' + employeeName + ' has pending appointments: ' + appts.value;
        showErrorPopUp();
      } else {
        toDeleteEmployeeId.value = employeeId;
        toDeleteEmployeeName.value = employeeName;
        showDeletePopUp();
      }
    }

    const toDeleteEmployeeId = vueref('');
    const toDeleteEmployeeName = vueref('');

    // The handleDeleteEmployee() function is called when the user confirms deletion
    // of an employee in the delete popup, and it deletes the employee document from Firestore \
    // and the corresponding employee image from Firebase storage.
    async function handleDeleteEmployee() {
      const employeeId = toDeleteEmployeeId.value;
      const employeeName = toDeleteEmployeeName.value;

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
    onMounted(() => {
      audio.value = new Audio(loadingAudio);
      audio.value.loop = true;
      display();
    });

    return {
      display,
      refresh,
      show,
      showError,
      errorMessage,
      showAddManpowerPopUp,
      showErrorPopUp,
      deleteMessage,
      showDelete,
      showDeletePopUp,
      handleDeleteEmployee,
      isLoading
    };
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
  <PopUp id="error-popup" v-model="showError">
    <h3>{{ errorMessage }}</h3>
  </PopUp>
  <DeletePopUp id="error-popup" v-model="showDelete" :onSubmit="handleDeleteEmployee">
    <h3>{{ deleteMessage }}</h3>
  </DeletePopUp>
  <LoadingPopUp v-model="isLoading" />
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

#manpower-table {
  margin-inline: 25%;
}

#manpower-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(215, 229, 243);
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 0rem 1rem;
  margin-bottom: 1rem;
}

#manpower-details {
  flex-grow: 1;
  text-align: center;
}

#manpower-profile-img {
  flex-grow: 3;
}

#employee-img {
  object-fit: cover;
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
  width: 20%;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
  transition: opacity 0.2s ease-in-out;
}

.bwt:hover {
  opacity: 0.9;
}

.bwt-small {
  position: absolute;
  right: -10px;
  top: -8px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background-color: red;
  color: white;
  font-weight: bold;
  font-size: 23px;
  text-align: center;
  cursor: pointer;
}
.bwt-small:hover {
  background-color: darkred;
}
</style>
