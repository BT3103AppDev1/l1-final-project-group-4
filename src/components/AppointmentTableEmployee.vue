<script>
import app from '../firebase.js'
import { getFirestore } from 'firebase/firestore'
import { collection, getDocs } from 'firebase/firestore'
import { onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';


export default {

  setup() {
    const store = useStore();

    const userName = store.state.userName;
    // console.log(userEmail)
    const db = getFirestore(app)
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
    };

    // async function addApptToday() {
    //   console.log("add")
    //   await addDoc(collection(db, "new-appointments/" + getToday() + "/s1"), {
    //       appt_id: '20230406S11',
    //       appt_date: getToday(),
    //       appt_pet: "Elsa",
    //       appt_time: "9am",
    //       appt_email: "admin@gmail.com",
    //       appt_name: "test",
    //       appt_service: "Full Grooming",
    //       appt_groomer: "mrsBeans",
    //       appt_status: "Not Completed"
    //   })
      
    

    // addApptToday()
       
    async function display() {
      let index = 1  
      const querySnapshot = await getDocs(collection(db, 'new-appointments'))
      const slotArray = ["s1", "s2", "s3", "s4"]
    
      querySnapshot.forEach(async (docDates) => {
        if (docDates.id < getToday()) {
          console.log("Dont show todays appointment dates")
          return;
        }
        // console.log(docDates.id, getToday())
        // if (docDates.id === getToday()) {
        //   console.log("Dont show todays appointment dates")
        //   return;
        // }
        // doc.data() is never undefined for query doc snapshots
        // move dates to today-appointments
        
        // console.log(docDates.id)
        for (let j = 0; j < slotArray.length; j++) {
            const querySnapshot1 = await getDocs(collection(db, 'new-appointments/' + docDates.id + "/" + slotArray[j]))
        // querySnapshot1.forEach(())
            querySnapshot1.forEach(async docc => { 

                let documentData = docc.data()
                // console.log(documentData)

                let apptdate = (documentData.appt_date)
                let email = (documentData.appt_email)
                let customer = (documentData.appt_name)
                let pet = (documentData.appt_pet)
                let service = (documentData.appt_service)
                let appttime = (documentData.appt_time)

                let bookingid = (documentData.appt_id);
                let groomer = documentData.appt_groomer;

               
                const values = [index, bookingid, email, customer, pet, service, apptdate, appttime, groomer]
              
                let table = document.getElementById('appointment-table-employee')
                let tr = document.createElement('tr')
                console.log(userName, groomer)
                if (userName === groomer) {

                  table.appendChild(tr)
                  for (let i = 0; i < 9; i++) {
                      let td = document.createElement('td')
                      if (values[i] != null) {
                        td.innerHTML = values[i]
                      }
                      tr.appendChild(td)
                  }
                  index += 1
                }
              })            
        }
      
      })
    }
    
    display()
    onBeforeUnmount(() => {
      let table = document.getElementById('appointment-table-employee')
      while (table.rows.length > 1) {
        table.deleteRow(1);
      }
    });
  }
}

</script>

<template>
    <table id="appointment-table-employee" class="auto-index">
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
