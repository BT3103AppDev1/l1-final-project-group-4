<script>
import app from '../firebase.js'
import { getFirestore } from 'firebase/firestore'
import { collection, getDocs } from 'firebase/firestore'
import { onBeforeUnmount } from 'vue';



export default {

  setup() {

    const db = getFirestore(app);

    // Function to get today's date in YYYY-MM-DD format
    function getToday() {
      var today = new Date();
      var dd = today.getDate();

      var mm = today.getMonth()+1; 
      var yyyy = today.getFullYear();
      if(dd<10) {
          dd='0'+dd;
      } 

      if (mm<10) {
          mm='0'+mm;
      } 
      today = yyyy+'-'+mm+'-'+dd;
      return today;
    }
    // Function that fetches data from new-appointments collection, since there are only 4 slots, we loop through each slope together
    // with today's date to get appointment information that happen today. The fields are appended to table elements which would be displayed.
    async function display() {
      let index = 1;
      const mapStatus = new Map([
        [0, "Not Started"], 
        [1, "In Progress"], 
        [2, "Completed"]
      ])

      const slotArray = ["s1", "s2", "s3", "s4"]
      // const statusArray = ['Not Completed', 'Bath', 'Cut', 'Groom']
      for (let slot of slotArray) {
        const querySnapshot = await getDocs(collection(db, 'new-appointments/' + getToday(), slot))
        querySnapshot.forEach(async (doc) => {
          let documentData = doc.data()

          let apptdate = (documentData.appt_date)
          let email = (documentData.appt_email)
          let customer = (documentData.appt_name)
          let pet = (documentData.appt_pet)
          let service = (documentData.appt_service)
          let appttime = (documentData.appt_time)
          let bookingid = (documentData.appt_id)
          let groomer = documentData.appt_groomer;
          let statusBath = documentData.status_bath;
          let statusGroom = documentData.status_groom;
          let statusCut = documentData.status_cut;

          const values = [index, bookingid, email, customer, pet, service, apptdate, appttime, groomer, statusBath, statusGroom, statusCut]

          let table = document.getElementById('appointment-table-today')
          let tr = document.createElement('tr')
          table.appendChild(tr)
          for (let i = 0; i < 12; i++) {
              let td = document.createElement('td')
              if (values[i] != null) {
                  if (i < 9) {
                    td.innerHTML = values[i]
                  } else if (i >= 9) {
                    // the bath, groom and cut values are 0, 1 or 2. Map these integers to the String progress
                    td.innerHTML = mapStatus.get(values[i])
                  }
              }
              tr.appendChild(td)
          }
          index += 1
        })
                        
          
      }
    }

    display()

    // On onbeforeunmount the tables rows are deleted there is only the header left.
    onBeforeUnmount(() => {
      let table = document.getElementById('appointment-table-today')
      while (table.rows.length > 1) {
        table.deleteRow(1);
      }
    });
  }
}

</script>

<template>
    <table id="appointment-table-today" class="auto-index">
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
            <th>GROOM</th>
            <th>CUT</th>
        </tr>
    </table><br><br>
   
</template>

<style scoped>

table {
    border-collapse: collapse;
    width: 100%
}

th {
    font-weight: bold;
    text-align: left;
}

tr{
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
  width: 20em;
  max-width: 20em;
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
  width: 10em;
  max-width: 10em;
}

th:nth-child(11) {
  width: 10em;
  max-width: 10em;
}
th:nth-child(12) {
  width: 10em;
  max-width: 10em;
}



</style>
