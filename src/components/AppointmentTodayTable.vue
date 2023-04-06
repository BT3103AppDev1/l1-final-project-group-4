<script>
import app from '../firebase.js'
import { getFirestore } from 'firebase/firestore'
import { collection, getDocs, getDoc, doc, setDoc } from 'firebase/firestore'
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
      today = mm+'-'+dd+'-'+yyyy;
      return today;
    }
       
    async function display() {
      let index = 1  
      const slotArray = ["S1", "S2", "S3", "S4"]

      for (let slot of slotArray) {
          const querySnapshot = await getDocs(collection(db, 'today-appointments/' + getToday(), slot))
        
        
        let statusArray = ["Not Started", "Bath", "Cut", "Groom", "Completed"]
        querySnapshot.forEach(async (docc) => {
          console.log(docc.id)
          for (let j = 0; j < slotArray.length; j++) {
            
              let documentData = docc.data()
              let apptdate = (documentData.appt_date)
              let email = (documentData.appt_email)
              let customer = (documentData.appt_name)
              let pet = (documentData.appt_pet)
              let service = (documentData.appt_service)
              let appttime = (documentData.appt_time)

              let bookingid = (documentData.appt_id)
              console.log(bookingid)
              let bookingRef = doc(db, "bookingtogroomer", bookingid);
              let bookingSnap = await getDoc(bookingRef);

              let bookingData = bookingSnap.data();
              console.log(bookingData)
              let groomer = bookingData.groomer;

              let apptstatus = documentData.appt_status


              const values = [index, bookingid, email, customer, pet, service, apptdate, appttime, groomer, apptstatus]
                
          
              let table = document.getElementById('appointment-table')
              let tr = document.createElement('tr')
              table.appendChild(tr)
              for (let i = 0; i < 11; i++) {
                let td = document.createElement('td')
                if (values[i] != null) {
                    if (i < 9) {
                      td.innerHTML = values[i]
                    }
                }
                  
                if (i == 9) {
                    var dropdown = document.createElement("select"); // Create a new dropdown element
                    dropdown.id = "myDropdown";
                    let k = 0;
                    for (var status of statusArray) {
                      var option = document.createElement("option"); 
                      option.value = status;
                      option.text = status;
                      dropdown.add(option);
                      if (status === apptstatus) {
                        dropdown.selectedIndex = k;
                      }
                      k += 1;
                    }
                    td.appendChild(dropdown);
                }
                
                if (i == 10) {
                  var submitButton = document.createElement("button");
                  submitButton.innerText = 'Save';
                  submitButton.addEventListener('click', async function() {
                    const selectedValue = dropdown.value
                    console.log("Selecting groomer: ", selectedValue)
                    await setDoc(doc(db, 'today-appointments/' + doc.id + "/" + slotArray[j], doc.id), {
                      status: selectedValue
                    })
                  })     
                  td.appendChild(submitButton)   
                }   
                tr.appendChild(td)    
              }
              
              index += 1
            }
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
            <th>SAVE</th>
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
  width: 20em;
  max-width: 20em;
}

th:nth-child(4) {
  width: 20em;
  max-width: 20em;
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
  width: 14em;
  max-width: 14em;
}


</style>
