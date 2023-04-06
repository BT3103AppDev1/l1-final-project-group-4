<script>
import app from '../firebase.js'
import { getFirestore } from 'firebase/firestore'
import { collection, getDocs } from 'firebase/firestore'
import { onBeforeUnmount } from 'vue';



export default {

  setup() {

    const db = getFirestore(app);

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
       
    async function display() {
      let index = 1  
      
      const slotArray = ["s1", "s2", "s3", "s4"]
      // const statusArray = ['Not Completed', 'Bath', 'Cut', 'Groom']
      for (let slot of slotArray) {
        const querySnapshot = await getDocs(collection(db, 'new-appointments/' + getToday(), slot))
        querySnapshot.forEach(async (doc) => {
          let documentData = doc.data()
          console.log(documentData)

          let apptdate = (documentData.appt_date)
          let email = (documentData.appt_email)
          let customer = (documentData.appt_name)
          let pet = (documentData.appt_pet)
          let service = (documentData.appt_service)
          let appttime = (documentData.appt_time)

          let bookingid = (documentData.appt_id)

          // let bookingRef = doc(db, "bookingtogroomer", bookingid);
          // let bookingSnap = await getDoc(bookingRef);

          // let bookingData = bookingSnap.data();

          // let groomer = bookingData.groomer;
          let groomer = documentData.appt_groomer;
          let stat = documentData.appt_status;

              // let groomer = (documentData.appt_groomer)
              // not working
          const values = [index, bookingid, email, customer, pet, service, apptdate, appttime, groomer, stat]
              // if (docDates.id === getToday() ) {
              //   await addDoc(collection(db, "today-appointments/" + docDates.id + "/" + slotArray[j]), {
              //     appt_date: apptdate,
              //     appt_email: email,
              //     appt_id: bookingid,
              //     appt_name: customer,
              //     appt_pet: pet,
              //     appt_service: service,
              //     appt_time: appttime,
              //     appt_status: "Not Started"
              //   });
              //   // TODO: NEED TO DELETE FROM NEW-APPOINTMENT
              //   await deleteDoc(doc(db, "new-appointments", docDates.id));
              // } else {
              let table = document.getElementById('appointment-table')
              let tr = document.createElement('tr')
              table.appendChild(tr)
              for (let i = 0; i < 10; i++) {
                  let td = document.createElement('td')
                  if (values[i] != null) {
                      if (i <= 9) {
                        td.innerHTML = values[i]
                      }
                  }
                  tr.appendChild(td)
              }
              index += 1
            })
                        
          
      }
    }
  
    

    display()
    onBeforeUnmount(() => {
      let table = document.getElementById('appointment-table')
      while (table.rows.length > 1) {
        table.deleteRow(1);
      }
    });
  }
}

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
            <th>STATUS</th>
        </tr>
    </table><br><br>
   
</template>

<style scoped>


table {
    border-collapse: collapse;
}

th {
    font-weight: bold;
    text-align: left;
}

tr{
    border-bottom: 1px black solid;
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
  width: 18em;
  max-width: 18em;
}

th:nth-child(4) {
  width: 12em;
  max-width: 12em;
}

th:nth-child(5) {
  width: 8em;
  max-width: 8em;
}

th:nth-child(6) {
  width: 10em;
  max-width: 10em;
}

th:nth-child(7) {
  width: 6em;
  max-width: 6em;
}

th:nth-child(8) {
  width: 9em;
  max-width: 9em;
}

th:nth-child(9) {
  width: 10em;
  max-width: 10em;
}
th:nth-child(10) {
  width: 10em;
  max-width: 10em;
}


</style>
