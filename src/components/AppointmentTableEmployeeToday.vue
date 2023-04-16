<script>
import app from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { ref as vueRef, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import AddProgressPopUp from '@/components/AddProgressPopUp.vue';
import PopUp from '@/components/PopUp.vue';

export default {
  components: {
    PopUp,
    AddProgressPopUp
  },
  setup() {
    const show = vueRef(false);
    const dogName = vueRef('');
    function showAddProgressPopUp(pet) {
      show.value = true;
      dogName.value = pet;
    }

    const showPopUp = vueRef(false);
    const message = vueRef('Saved');
    function showMessagePopUp() {
      showPopUp.value = true;
    }

    const db = getFirestore(app);

    // getToday() returns todays date in YYYY-MM-DD format
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
    const today = getToday()

    // display() fetches all appointment fields for the employee happening today. It creates table elements that would be displayed. 
    async function display() {
      const store = useStore();

      const userName = store.state.userName;
      console.log(userName);
      let index = 1;
      const slotArray = ['s1', 's2', 's3', 's4'];
      const statusArray = ['Not Started', 'In Progress', 'Completed'];
      // Only 4 slots, loop through all 4 slots to check if they exist. If exist, details will be added to a table row
      for (let j = 0; j < slotArray.length; j++) {
        var querySnapshot = await getDocs(
          collection(db, 'new-appointments/' + today + '/' + slotArray[j])
        );
        querySnapshot.docs;
        querySnapshot.forEach(async (docc) => {
          let documentData = docc.data();
          // console.log(documentData)

          let apptdate = documentData.appt_date;
          let email = documentData.appt_email;
          let customer = documentData.appt_name;
          let pet = documentData.appt_pet;
          let service = documentData.appt_service;
          let appttime = documentData.appt_time;
          let bookingid = documentData.appt_id;
          let groomer = documentData.appt_groomer;
          let statusBath = documentData.status_bath;
          let statusGroom = documentData.status_groom;
          let statusCut = documentData.status_cut;

          const values = [index, bookingid, email, customer, pet, service, apptdate, appttime, groomer, statusBath, statusCut, statusGroom]
          let table = document.getElementById('appointment-table-today-employee');

          // filters the groomer to match the userName. Groomers that do not match the user are not shown in this component.
          if (groomer === userName) {
            let tr = document.createElement('tr');
            for (let i = 0; i < 14; i++) {
              table.appendChild(tr);
              let td = document.createElement('td');
              if (values[i] != null) {
                if (i < 9) {
                  td.innerHTML = values[i];
                }
              }
              if (i == 9) {
                var dropdown = document.createElement('select'); // Create a new dropdown element
                dropdown.id = 'myDropdown' + i;
                let k = 0;

                for (var status of statusArray) {
                  console.log('status: ', status);
                  // console.log("Employee: ", employee)
                  var option = document.createElement('option');
                  option.value = k;
                  option.text = status;
                  dropdown.add(option);
                  if (parseInt(values[i]) === k) {
                    dropdown.selectedIndex = k;
                  }
                  k += 1;
                }
                td.appendChild(dropdown);
              }

              if (i == 10) {
                var dropdown1 = document.createElement('select'); // Create a new dropdown element
                dropdown.id = 'myDropdown' + i;
                let k = 0;

                for (var status1 of statusArray) {
                  console.log('status: ', status1);
                  // console.log("Employee: ", employee)
                  var option1 = document.createElement('option');
                  option1.value = k;
                  option1.text = status1;
                  dropdown1.add(option1);
                  if (parseInt(values[i]) === k) {
                    dropdown1.selectedIndex = k;
                  }
                  k += 1;
                }
                td.appendChild(dropdown1);
              }

              if (i == 11) {
                var dropdown2 = document.createElement('select'); // Create a new dropdown element
                dropdown2.id = 'myDropdown' + i;
                let k = 0;

                for (var status2 of statusArray) {
                  console.log('status2: ', status2);
                  // console.log("Employee: ", employee)
                  var option2 = document.createElement('option');
                  option2.value = k;
                  option2.text = status2;
                  dropdown2.add(option2);
                  console.log('Selected:', values[i]);
                  console.log('k', k);
                  if (parseInt(values[i]) === k) {
                    console.log(values[i], k);
                    dropdown2.selectedIndex = k;
                  }
                  k += 1;
                }
                td.appendChild(dropdown2);
              }

              if (i == 12) {
                var button = document.createElement('button'); // Create a new dropdown element
                button.innerText = 'Update';
                button.onclick = function () {
                  showAddProgressPopUp(pet);
                };
                td.appendChild(button);
              }

              if (i == 13) {
                console.log(slotArray[j]);
                var submitButton = document.createElement('button');
                submitButton.innerText = 'Save';
                submitButton.addEventListener('click', async function () {
                  console.log(dropdown.value, dropdown1.value, dropdown2.value);
                  await updateDoc(
                    doc(db, 'new-appointments/' + today + '/' + slotArray[j], docc.id),
                    {
                      status_bath: parseInt(dropdown.value),
                      status_groom: parseInt(dropdown1.value),
                      status_cut: parseInt(dropdown2.value)
                    }
                  );
                  showMessagePopUp();
                });
                td.appendChild(submitButton);
              }
              tr.appendChild(td);
            }
            index += 1;
          }
        });
      }
    }

    display();
     // On onbeforeunmount the tables rows are deleted there is only the header left.
    onBeforeUnmount(() => {
      let table = document.getElementById('appointment-table-today-employee');
      while (table.rows.length > 1) {
        table.deleteRow(1);
      }
    });
    return {
      display,
      show,
      dogName,
      showPopUp,
      message,
      showMessagePopUp
    };
  }
};
</script>

<template>
  <table id="appointment-table-today-employee" class="auto-index">
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
      <th>BATH</th>
      <th>CUT</th>
      <th>GROOM</th>
      <th>PIC</th>
      <th>SAVE</th>
    </tr>
  </table>
  <br /><br />
  <PopUp id="popup" v-model="showPopUp">
    <h3>
      {{ message }}
    </h3>
  </PopUp>
  <AddProgressPopUp
    v-model="show"
    :dog-name="dogName"
    @update:modelValue="refresh"
  ></AddProgressPopUp>
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
