<script>
import app from '../firebase.js';
import { watch } from 'vue';
import { getFirestore, doc, getDocs, getDoc, collection, query, where } from 'firebase/firestore';
import { useStore } from 'vuex';

export default {
  props: {
    newDate: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const db = getFirestore(app);
    const store = useStore();
    const userEmail = store.state.userEmail;

    watch(
      () => props.newDate,
      async (newValue) => {
        console.log("New date:", newValue);
        const apptRef = doc(db, 'appointments', newValue);
        const apptDocSnapshot = await getDoc(apptRef); //retrieve doc
        let timingAndDates = [];

          if (!apptDocSnapshot.exists()) {
            console.error("Appointment document doesn't exist"); 
            return;
          }
        
        try {
          const s1Ref = collection(apptRef, "s1");
          const q1 = query(s1Ref, where ("appt_email", "==", userEmail))
          const q1Snapshot = await getDocs(q1)

          if (q1Snapshot.empty) {
            console.log("user doesnt have appt at s1")
          }
          else {
            //console.log(`Found document with email ${userEmail}: `);
            q1Snapshot.forEach((doc) => {
              const docData = doc.data();
              let time = docData.appt_time
              let pet = docData.appt_pet
              timingAndDates.push([time,pet])
            })
          }
        } 
        
        catch (error) {
          throw new Error('error in s1')
        }
    
        try {
          const s2Ref = collection(apptRef, "s2");
          const q2 = query(s2Ref, where ("appt_email", "==", userEmail))
          const q2Snapshot = await getDocs(q2)

          if (q2Snapshot.empty) {
            console.log("user doesnt have appt at s2")
          }
          else {
            //console.log(`Found document with email ${userEmail}: `);
            q2Snapshot.forEach((doc) => {
              const docData = doc.data();
              let time = docData.appt_time
              let pet = docData.appt_pet

              timingAndDates.push([time,pet])
            
            })
          }
        } catch (error) {
          throw new Error ('error in s2')
        }

        try {
          const s3Ref = collection(apptRef, "s3");
          const q3 = query(s3Ref, where ("appt_email", "==", userEmail))
          const q3Snapshot = await getDocs(q3)

          if (q3Snapshot.empty) {
            console.log("user doesnt have appt at s3")
          }
          else {
            //console.log(`Found document with email ${userEmail}: `);
            q3Snapshot.forEach((doc) => {
              const docData = doc.data();
              let time = docData.appt_time
              let pet = docData.appt_pet

              timingAndDates.push([time,pet])
            })
          }
        } catch (error) {
          throw new Error ('error in s3')
        }

        try {
          const s4Ref = collection(apptRef, "s4");
          const q4 = query(s4Ref, where ("appt_email", "==", userEmail))
          const q4Snapshot = await getDocs(q4)

          if (q4Snapshot.empty) {
            console.log("user doesnt have appt at s4")
          }
          else {
            //console.log(`Found document with email ${userEmail}: `);
            q4Snapshot.forEach((doc) => {
              const docData = doc.data();
              let time = docData.appt_time
              let pet = docData.appt_pet

              timingAndDates.push([time,pet])
            })
          }
        } catch (error) {
          throw new Error ('error in s4')
        } 
        //console.log(timingAndDates)
        display(timingAndDates);
      }

    );


    async function display(timingAndDates) {
      
      for (let i = 0; i < timingAndDates.length; i++) {
        let time = timingAndDates[i][0];
        let pet = timingAndDates[i][1]
        
        let table = document.getElementById('appointments-table');
        let tr = document.createElement('tr');
        table.appendChild(tr);
        let td = document.createElement('td');
        tr.appendChild(td);

        let div1 = document.createElement('div');
        div1.id = 'appt-info';
        td.appendChild(div1);

        let img = document.createElement('img');
        img.id = 'card-profile-img';
        img.src = 'src/assets/dog1.png'; // change this
        div1.appendChild(img);

        let div2 = document.createElement('div');
        div2.id = 'appt-details';
        div1.appendChild(div2);

        let header1 = document.createElement('h3');
        header1.id = 'pet-name';
        div2.appendChild(header1);
        header1.innerHTML = 'Name: ' + pet;
        let header2 = document.createElement('h3');
        header2.id = 'appt-time';
        div2.appendChild(header2);
        header2.innerHTML = 'Time: ' + time;
      }
    }
  }
};



</script>

<template>
    <div id = "appointments-container" > 
      <div id= "appts-cards" >
        <table id = "appointments-table"> </table>
       </div> 
    </div>

</template>

<style>

#appointments-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 22px;
}


#appt-info {
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: rgb(215, 229, 243);
  border-radius: 20px;
}

#appts-cards {
  width: 95%;
  margin: 0 auto; /* Update margin to center the element horizontally */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100%, 100%));
  grid-gap: 20px;
}
#appointments-table td {
  padding: 1em; /* Add this line to remove the default padding of table cells */
}


#card-profile-img {
  width: 200px;
  height: 200px;
}

#pet-name, #appt-time {
  color: #2c5b94;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 20px;
  margin-top: 0.6em;
}

</style>