<script>
import app from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, getDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { onBeforeUnmount } from 'vue';
import { ref as vueref } from 'vue';
import PopUp from '@/components/PopUp.vue';
import DeletePopUp from '@/components/DeletePopUp.vue';

export default {
  components: {
    PopUp,
    DeletePopUp
  },

  setup() {
    const show = vueref(false);
    const message = vueref('');
    function showPopUp() {
      show.value = true;
    }

    const showDelete = vueref(false);
    const deleteMessage = vueref('');
    function showDeletePopUp() {
      showDelete.value = true;
    }

    const db = getFirestore(app);
    function getToday() {
      var today = new Date();
      var dd = today.getDate();

      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }

      if (mm < 10) {
        mm = '0' + mm;
      }
      today = yyyy + '-' + mm + '-' + dd;
      return today;
    }

    // canSwapGroomer() function checks if a groomer is available to swap appointments. 
    // The function retrieves data from Firestore collections and documents to determine if the groomer is available for the given date and time slot.
    async function canSwapGroomer(selectedValue, date, slot, bookingid) {
      const querySnapshot1 = await getDocs(collection(db, 'new-appointments/' + date + '/' + slot));
      let slots = querySnapshot1.docs;

      for await (let slot of slots) {
        let docccData = slot.data();
        if (
          (docccData.appt_groomer === new String(selectedValue).valueOf()) &
          (docccData.appt_id != bookingid)
        ) {
          return false;
        }
      }
      const querySnapshot2 = await getDoc(doc(db, 'schedule/leaves/' + selectedValue + '/' + date));
      // if owner can approve leave
      if (querySnapshot2.exists()) {
    
        return false;
      }
      return true;
    }

    // display() function retrieves data from new-appointments, creates an HTML table to display the data, 
    // and populates the table with the retrieved data. The function also includes logic for handling appointments that need to 
    // be moved to a different collection or deleted based on the current date. 
    // The function also creates a dropdown element with options for selecting a groomer for an appointment.
    async function display() {
      let index = 1;
      const querySnapshot = await getDocs(collection(db, 'new-appointments'));
      const slotArray = ['s1', 's2', 's3', 's4'];

      const employeeSnapshot = await getDocs(collection(db, 'employees'));
      let employeeArray = ['Select'];
      employeeSnapshot.forEach((doc) => {
        let documentData = doc.data();
        let employeeName = documentData.name;
        employeeArray.push(employeeName);
      });
      querySnapshot.forEach(async (docDates) => {
        if (docDates.id < getToday()) {
          return;
        }

        for (let j = 0; j < slotArray.length; j++) {
          const querySnapshot1 = await getDocs(
            collection(db, 'new-appointments/' + docDates.id + '/' + slotArray[j])
          );

          querySnapshot1.forEach(async (docc) => {
            let documentData = docc.data();

            let apptdate = documentData.appt_date;
            let email = documentData.appt_email;
            let customer = documentData.appt_name;
            let pet = documentData.appt_pet;
            let service = documentData.appt_service;
            let appttime = documentData.appt_time;
            let bookingid = documentData.appt_id;
            let groomer = documentData.appt_groomer;

            const values = [
              index,
              bookingid,
              email,
              customer,
              pet,
              service,
              apptdate,
              appttime,
              groomer
            ];

            let table = document.getElementById('appointment-table');
            let tr = document.createElement('tr');
            table.appendChild(tr);
            for (let i = 0; i < 11; i++) {
              let td = document.createElement('td');
              if (values[i] != null) {
                if (i < 8) {
                  td.innerHTML = values[i];
                }
              }

              if (i == 8) {
                var dropdown = document.createElement('select'); // Create a new dropdown element
                dropdown.id = 'myDropdown';
                let k = 0;

                for (var employee of employeeArray) {
                  var option = document.createElement('option');
                  if (employee != 'Select') {
                    option.value = employee;
                  } else {
                    option.value = null;
                  }
                  option.text = employee;
                  dropdown.add(option);
                  if (employee === groomer) {
                    dropdown.selectedIndex = k;
                  }
                  k += 1;
                }
                td.appendChild(dropdown);
              }

              if (i == 9) {
                var submitButton = document.createElement('button');
                submitButton.innerText = 'Save';
                submitButton.addEventListener('click', async function () {
                  const selectedValue = dropdown.value;
                  console.log('Selecting groomer: ', selectedValue);
                  if (await canSwapGroomer(selectedValue, docDates.id, slotArray[j], bookingid)) {
                    console.log('Changed Groomer');
                    await updateDoc(
                      doc(db, 'new-appointments/' + docDates.id + '/' + slotArray[j], docc.id),
                      {
                        appt_groomer: selectedValue
                      }
                    );
                    message.value = 'Saved';
                  } else {
                    // if cannot change, it would change to the correct index based on what is in the database
                    console.log('Cannot change groomer');
                    const l = await getDoc(
                      doc(db, 'new-appointments/' + docDates.id + '/' + slotArray[j], docc.id)
                    );
                    let p = 0;
                    for (var employee of employeeArray) {
                      if (employee === 'Select') {
                        if (l.data().appt_groomer === 'null') {
                          dropdown.selectedIndex = p;
                          break;
                        }
                      }

                      if (employee === l.data().appt_groomer) {
                        dropdown.selectedIndex = p;

                        break;
                      }
                      p += 1;
                    }
                    if (employeeArray[p] != selectedValue) {
                      message.value =
                        'Failed to change groomer. Groomer is already occupied at that moment or is on leave that day.';
                    }
                  }
                  showPopUp();
                });
                td.appendChild(submitButton);
              }
              if (i == 10) {
                var deleteButton = document.createElement('button');
                deleteButton.innerText = 'Delete';
                deleteButton.onclick = function () {
                  deleteAppt(docDates.id, slotArray[j], docc.id);
                };

                td.appendChild(deleteButton);
              }
              tr.appendChild(td);
            }
            index += 1;
          });
        }
      });
    }

    async function handleDeleteAppt() {
      const deleteDate = toDeleteDate.value;
      const deleteSlot = toDeleteSlot.value;
      const deleteDocID = toDeleteDocID.value;

      await deleteDoc(doc(db, 'new-appointments/' + deleteDate + '/' + deleteSlot, deleteDocID));
      location.reload();
    }

    const toDeleteDate = vueref('');
    const toDeleteSlot = vueref('');
    const toDeleteDocID = vueref('');

    // function is called when owner hits the delete button. Confirmation popup is shown from this function
    function deleteAppt(date, slot, docID) {
      deleteMessage.value = 'You are going to delete appointment on: ' + date;
      toDeleteDate.value = date;
      toDeleteSlot.value = slot;
      toDeleteDocID.value = docID;
      showDeletePopUp();
    }

    display();
     // On onbeforeunmount the tables rows are deleted there is only the header left.
    onBeforeUnmount(() => {
      let table = document.getElementById('appointment-table');
      while (table.rows.length > 1) {
        table.deleteRow(1);
      }
    });

    return {
      display,
      show,
      message,
      showPopUp,
      showDelete,
      deleteMessage,
      showDeletePopUp,
      handleDeleteAppt
    };
  }
};
</script>

<template>
  <table id="appointment-table" class="auto-index">
    <tr>
      <th>S.NO</th>
      <th>BOOKING ID</th>
      <th>EMAIL</th>
      <th>CUSTOMER</th>
      <th>PET</th>
      <th>SERVICE</th>
      <th>DATE</th>
      <th>TIME</th>
      <th>EMPLOYEE</th>
      <th>SAVE</th>
      <th>DELETE</th>
    </tr>
  </table>
  <br /><br />
  <PopUp id="popup" v-model="show">
    <h3>
      {{ message }}
    </h3>
  </PopUp>
  <DeletePopUp id="delete-popup" v-model="showDelete" :onSubmit="handleDeleteAppt">
    <h3>{{ deleteMessage }}</h3>
  </DeletePopUp>
</template>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th {
  font-weight: bold;
  text-align: left;
}

tr {
  border-bottom: 1px black solid;
  width: 100%;
}

th:nth-child(1) {
  width: 4em;
}

/* the second */
th:nth-child(2) {
  width: 10em;
  max-width: 10em;
}

/* the third */
th:nth-child(3) {
  width: 24em;
  max-width: 24em;
}

th:nth-child(4) {
  width: 19em;
  max-width: 19em;
}

th:nth-child(5) {
  width: 10em;
  max-width: 10em;
}

th:nth-child(6) {
  width: 13em;
  max-width: 13em;
}

th:nth-child(7) {
  width: 8em;
  max-width: 8em;
}

th:nth-child(8) {
  width: 10em;
  max-width: 10em;
}

th:nth-child(9) {
  width: 12em;
  max-width: 12em;
}
th:nth-child(10) {
  width: 5em;
  max-width: 5em;
}

th:nth-child(11) {
  width: 5em;
  max-width: 5em;
}
</style>
