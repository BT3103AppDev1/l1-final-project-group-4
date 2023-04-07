<script>
import app from '../firebase.js'
import { getFirestore } from 'firebase/firestore'
import { collection, getDocs, getDoc, doc, deleteDoc, updateDoc, addDoc } from 'firebase/firestore'
import { onBeforeUnmount } from 'vue';


export default {

  setup() {

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
    }

    async function addApptToday() {
      console.log("add")
      await addDoc(collection(db, "new-appointments/" + getToday() + "/s1"), {
          appt_id: '20230406S11',
          appt_date: getToday(),
          appt_pet: "Elsa",
          appt_time: "9am",
          appt_email: "admin@gmail.com",
          appt_name: "test",
          appt_service: "Full Grooming",
          appt_groomer: "mrsBeans",
          appt_status: "Not Completed"
      })
      
    }

    // addApptToday()

    async function canSwapGroomer(selectedValue, date, slot, bookingid) {
        const querySnapshot1 = await getDocs(collection(db, 'new-appointments/' + date + "/" + slot))
        let slots = querySnapshot1.docs

        for await(let slot of slots) {
          console.log(slot.id)
          let docccData = slot.data()
          
          // const doccccSnap = await getDoc(doc(db, "bookingtogroomer", docccData.appt_id))
          console.log("Comparing ", docccData.appt_groomer, " and ", selectedValue)
          if (docccData.appt_groomer === new String(selectedValue).valueOf() & docccData.appt_id != bookingid) {
            console.log("false")
            return false;
          }
        }
        console.log('schedule/leaves/' + selectedValue  + '/' + date)
        const querySnapshot2 = await getDoc(doc(db, 'schedule/leaves/' + selectedValue + '/' + date))
        // if owner can approve leave
        if (querySnapshot2.exists()) {
          // uncomment if dont need to approve leave
          // return false;
          console.log("Document data:", querySnapshot2.data());
          return !querySnapshot2.data().approved;
        }
        return true;
    }
       
    async function display() {
      let index = 1  
      const querySnapshot = await getDocs(collection(db, 'new-appointments'))
      const slotArray = ["s1", "s2", "s3", "s4"]
    
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
        // console.log(docDates.id, getToday())
        if (docDates.id <= getToday()) {
          console.log("Dont show todays appointment dates")
          return;
        }
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

                let bookingid = (documentData.appt_id)

                // let bookingRef = doc(db, "bookingtogroomer", bookingid);
                // let bookingSnap = await getDoc(bookingRef);

                // let bookingData = bookingSnap.data();

                // let groomer = bookingData.groomer;
                let groomer = documentData.appt_groomer;

                // let groomer = (documentData.appt_groomer)
                // not working
                const values = [index, bookingid, email, customer, pet, service, apptdate, appttime, groomer]
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
                for (let i = 0; i < 11; i++) {
                    let td = document.createElement('td')
                    if (values[i] != null) {
                        if (i < 8) {
                          td.innerHTML = values[i]
                        }
                    }
                    
                    if (i == 8) {
        
                        var dropdown = document.createElement("select"); // Create a new dropdown element
                        dropdown.id = "myDropdown";
                        let k = 0;
                        
                        
                        for (var employee of employeeArray) {
                          console.log("Groomer: ", groomer)
                          console.log("Employee: ", employee)
                          var option = document.createElement("option"); 
                          if (employee != "Select") { 
                              option.value = employee;
                          } else {
                              option.value = null
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
                      var submitButton = document.createElement("button");
                      submitButton.innerText = 'Save';
                      submitButton.addEventListener('click', async function() {
                        const selectedValue = dropdown.value
                        console.log("Selecting groomer: ", selectedValue)
                        if (await canSwapGroomer(selectedValue, docDates.id, slotArray[j], bookingid)) {
                          console.log("Changed Groomer")
                          await updateDoc(doc(db, 'new-appointments/' + docDates.id + "/" + slotArray[j], docc.id), {
                            appt_groomer: selectedValue
                          });
                        } else {
                          console.log("cannot change")
                          const l = await getDoc(doc(db, 'new-appointments/' + docDates.id + "/" + slotArray[j], docc.id));
                          let p = 0;
                          for (var employee of employeeArray) {
                            if (employee === "Select") {
                             
                              if (l.data().appt_groomer === "null") {
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
                            alert("Failed to change groomer. Groomer is already occupied at that moment or is on leave that day");
                          }
                        }
                      })
                      td.appendChild(submitButton)
                    } 
                    if (i == 10) {
                      var deleteButton = document.createElement("button");
                      deleteButton.innerText = 'Delete';
                      deleteButton.addEventListener('click', async function() {
                        console.log('new-appointments/' + docDates.id + "/" + slotArray[j] + "/" + docc.id)
                        // add a pop up
                        await deleteDoc(doc(db, 'new-appointments/' + docDates.id + "/" + slotArray[j], docc.id));
                        location.reload();
                      });
                    
                      td.appendChild(deleteButton)
                    }
                    tr.appendChild(td)
                }
                index += 1
              })
                          
            
        }
      
        })
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
            <th>SAVE</th>
            <th>DELETE</th>
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
