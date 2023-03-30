<script>
import app from '../firebase.js'
import { getFirestore } from 'firebase/firestore'
import { collection, getDocs } from 'firebase/firestore'


export default {

  setup() {
    const db = getFirestore(app)

    async function display() {
      let index = 1  
      const querySnapshot = await getDocs(collection(db, 'appointments'))
      const datearray = ["s1", "s2", "s3", "s4"]
      querySnapshot.forEach(async (docDates) => {
        // doc.data() is never undefined for query doc snapshots
        
        console.log(docDates.id)
        for (let i = 0; i < datearray.length; i++) {
            const querySnapshot1 = await getDocs(collection(db, 'appointments/' + docDates.id + "/" + datearray[i]))
        // querySnapshot1.forEach(())
            querySnapshot1.forEach(doc => { 

                let documentData = doc.data()
                console.log(documentData)

                let apptdate = (documentData.appt_date)
                let email = (documentData.appt_email)
                let customer = (documentData.appt_name)
                let pet = (documentData.appt_pet)
                let service = (documentData.appt_service)
                let appttime = (documentData.appt_time)

                let bookingid = (documentData.appt_id)
                let groomer = (documentData.appt_groomer)

                const values = [index, bookingid, email, customer, pet, service, apptdate, appttime, groomer]

                let table = document.getElementById('appointment-table')
                let tr = document.createElement('tr')
                table.appendChild(tr)
                for (let i = 0; i < 9; i++) {
                    let td = document.createElement('td')
                    if (values[i] != null) {
                        td.innerHTML = values[i]
                    } else {
                        td.innerHTML = "Select"
                    }
                    tr.appendChild(td)
                }
                index += 1
                
                        
                    
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
            <th>S.No</th>
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

<style>

</style>
