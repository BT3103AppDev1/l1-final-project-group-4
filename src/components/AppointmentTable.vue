<script>
import app from '../firebase.js'
import { getFirestore } from 'firebase/firestore'
import { collection, getDocs, getDoc, doc, setDoc} from 'firebase/firestore'


export default {

  setup() {
    const db = getFirestore(app)

    async function display() {
      let index = 1  
      const querySnapshot = await getDocs(collection(db, 'new-appointments'))
      const datearray = ["s1", "s2", "s3", "s4"]
    
      const employeeSnapshot = await getDocs(collection(db, 'employees'))
      let employeeArray = ["Select"]
      employeeSnapshot.forEach((doc) => {
        let documentData = doc.data()
        let employeeName = documentData.name
        // console.log("Adding")
        // console.log(employeeName)
        employeeArray.push(employeeName)
      })

      querySnapshot.forEach(async (docDates) => {
        // doc.data() is never undefined for query doc snapshots
        
        // console.log(docDates.id)
        for (let i = 0; i < datearray.length; i++) {
            const querySnapshot1 = await getDocs(collection(db, 'new-appointments/' + docDates.id + "/" + datearray[i]))
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

                let bookingid = (documentData.appt_id)

                let bookingRef = doc(db, "bookingtogroomer", bookingid);
                let bookingSnap = await getDoc(bookingRef);

                let bookingData = bookingSnap.data();

                let groomer = bookingData.groomer;

                // let groomer = (documentData.appt_groomer)

                const values = [index, bookingid, email, customer, pet, service, apptdate, appttime, groomer]

                let table = document.getElementById('appointment-table')
                let tr = document.createElement('tr')
                table.appendChild(tr)
                for (let i = 0; i < 10; i++) {
                    let td = document.createElement('td')
                    if (values[i] != null) {
                        if (i < 8) {
                          td.innerHTML = values[i]
                        }
                    }
                    
                    if (i == 8) {
                        var dropdown = document.createElement("select"); // Create a new dropdown element
                        dropdown.id = "myDropdown";
                        let j = 0;
                        for (var employee of employeeArray) {
                            var option = document.createElement("option"); 
                            if (employee != "Select") { 
                                option.value = employee;
                            } else {
                                option.value = null
                            }
                            option.text = employee;
                            dropdown.add(option);
                            if (employee === groomer) {
                              dropdown.selectedIndex = j;
                            }
                            j += 1;
                        }
                        td.appendChild(dropdown);
                    }
                    

                    if (i == 9) {
                      var submitButton = document.createElement("button");
                      submitButton.innerText = 'Save';
                      submitButton.addEventListener('click', function() {
                        const selectedValue = dropdown.value
                        console.log("Selecting groomer: ", selectedValue)
                        setDoc(doc(db, "bookingtogroomer", bookingid), {
                          groomer: selectedValue
                        });
                      })
                      td.appendChild(submitButton)
                    }
                    tr.appendChild(td)
                index += 1
                }
                
                      
              })
            
        }
      
        })
    }
    display()
    
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
            <th>SELECT</th>
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
