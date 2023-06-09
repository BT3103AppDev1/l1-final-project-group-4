<script>
import app from '../firebase.js';
import { getFirestore, getDocs, collection, query, where } from 'firebase/firestore';
import { getStorage, ref as storageref, getDownloadURL } from 'firebase/storage';
import { useStore } from 'vuex';
import { toRef, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import LoadingPopUp from '@/components/LoadingPopUp.vue';
import loadingAudio from '../assets/loadingAudio.mp3';

export default {
  components: {
    LoadingPopUp
  },
  props: {
    newDate: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const router = useRouter();
    const db = getFirestore(app);
    const storage = getStorage(app);
    const store = useStore();
    const userEmail = store.state.userEmail;
    const todaysdate = toRef(props, 'newDate').value;
    let noappts = true;
    const slots = ['s1', 's2', 's3', 's4'];
    let bookingsInfo = [];

    // loading popup
    const isLoading = ref(false);
    const audio = ref(null);
    const playAudio = () => {
      audio.value.play();
    };
    const pauseAudio = () => {
      audio.value.pause();
    };

    // Get all past appointment based on today's date. If there are past appointments, they will display the appointment fetched,
    async function getPastAppointments(todaysdate) {
      isLoading.value = true;
      playAudio();
      const apptsCollection = collection(db, 'new-appointments');
      const querySnapshot = await getDocs(apptsCollection);

      for (const doc of querySnapshot.docs) {
        // filters for pasts appointments
        if (doc.id < todaysdate) {
          for (var i = 0; i < slots.length; i++) {
            //check each slot s1, s2, s3, s4 to see if user has an appt below
            const slotRef = collection(doc.ref, slots[i]); //check if s1/s2/s3/s4 exists in the document i am in now
            const slotSnapshot = await getDocs(slotRef);
            // if the slot exist on that date, it will check if the email is the same as the user email.
            // And get the relevant data that will be parsed in to the display() function
            if (!slotSnapshot.empty) {
              const userEmailQuery = query(slotRef, where('appt_email', '==', userEmail)); //query for documents where the email atrribute == userEmail in this slot
              const userEmailSnapshot = await getDocs(userEmailQuery);

              if (!userEmailSnapshot.empty) {
                noappts = false;
                userEmailSnapshot.forEach((userDoc) => {
                  const docData = userDoc.data();
                  let date = docData.appt_date;
                  let groomer = docData.appt_groomer;
                  let pet = docData.appt_pet;
                  let service = docData.appt_service;
                  let time = docData.appt_time;
                  let slot = slots[i];
                  let docID = userDoc.id;

                  bookingsInfo.push([date, groomer, pet, service, time, slot, docID]);
                });
              }
            }
          }
        }
      }
      // If noappts, white bold text appearsm indicating 'No past appointments, schedule one now!'
      if (noappts == true) {
        let nothing = document.getElementById('no-appts');
        let text = document.createElement('h2');
        text.id = 'no-appt-text';
        nothing.appendChild(text);
        text.innerHTML = 'No past appointments, schedule one now!';
        text.style.color = 'white';
        text.style.fontWeight = 'bold';
        text.style.fontSize = '3em';
        text.style.display = 'flex';
        text.style.alignItems = 'center';
        text.style.justifyContent = 'center';
        text.style.marginTop = '2em';
      } else {
        display(bookingsInfo);
      }
      isLoading.value = false;
      pauseAudio();
    }

    getPastAppointments(todaysdate);

    // The display() function displays the bookingsInfo in the desired manner by creating their own elements and appending it to
    // the appointments-table.
    async function display(bookingsInfo) {
      for (let i = 0; i < bookingsInfo.length; i++) {
        let date = bookingsInfo[i][0];
        let groomer = bookingsInfo[i][1];
        let pet = bookingsInfo[i][2];
        let service = bookingsInfo[i][3];
        let time = bookingsInfo[i][4];
        let slot = bookingsInfo[i][5];
        let docID = bookingsInfo[i][6];

        let table = document.getElementById('appointments-table');
        let tr = document.createElement('tr');
        table.appendChild(tr);
        let td = document.createElement('td');
        tr.appendChild(td);

        let div1 = document.createElement('div');
        div1.id = 'appt-info';
        div1.className = docID;
        td.appendChild(div1);

        let img = document.createElement('img');
        await getDownloadURL(storageref(storage, userEmail + '-' + pet + '.png')).then((url) => {
          img.setAttribute('src', url);
        });
        img.id = 'dog-img';
        div1.appendChild(img);

        let div2 = document.createElement('div');
        div2.id = 'appt-details';
        div1.appendChild(div2);

        let div3 = document.createElement('div');
        div3.id = 'button';
        div1.appendChild(div3);

        let br = document.createElement('br');
        div2.appendChild(br);

        let header1 = document.createElement('h3');
        header1.id = 'pet-name';
        div2.appendChild(header1);
        header1.innerHTML = 'Name: ' + pet;

        let header2 = document.createElement('h3');
        header2.id = 'appt-date';
        div2.appendChild(header2);
        header2.innerHTML = 'Date: ' + date;

        let header3 = document.createElement('h3');
        header3.id = 'appt-time';
        div2.appendChild(header3);
        header3.innerHTML = 'Time: ' + time;

        let header5 = document.createElement('h3');
        header5.id = 'appt-service';
        div2.appendChild(header5);
        header5.innerHTML = 'Service: ' + service;

        let header4 = document.createElement('h3');
        header4.id = 'appt-groomer';
        div2.appendChild(header4);
        if (groomer != null) {
          header4.innerHTML = 'Groomer: ' + groomer;
        }

        let progressButton = document.createElement('button');
        progressButton.className = 'progress-button';
        progressButton.innerHTML = 'View Progress';
        div3.appendChild(progressButton);
        if (date == todaysdate) {
          progressButton.addEventListener('click', () => {
            router.push({
              name: 'groomingprogress',
              query: {
                myDate: date,
                myDocID: docID,
                mySlot: slot
              }
            });
          });
        } else {
          progressButton.style.opacity = '0.5';
        }
      }
    }

    onMounted(() => {
      audio.value = new Audio(loadingAudio);
      audio.value.loop = true;
      getPastAppointments(todaysdate);
    });

    return { isLoading };
  }
};
</script>

<template>
  <div id="appointments-container">
    <div id="appts-cards">
      <div id="no-appts"></div>
      <table id="appointments-table"></table>
    </div>
    <LoadingPopUp v-model="isLoading" />
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

#appt-details {
  display: flex;
  flex-direction: column;
  flex-grow: 4;
}
#button {
  display: flex;
  flex-grow: 1;
  height: 20%;
}
.progress-button {
  background-color: #2c5b94;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 15px;
  color: white;
  margin-top: 5em;
  padding: 1em;
  border: none;
  border-radius: 10px;
  box-shadow: 3px 3px 3px #c3c0c0;
}

#pet-name,
#appt-time,
#appt-service,
#appt-groomer,
#appt-date {
  color: #2c5b94;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 20px;
  margin-top: 0.2em;
  margin-left: 3em;
}

#dog-img {
  object-fit: cover;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  margin: 1.5em;
}

@media (max-width: 1040px) {
  #dog-img {
    display: none;
  }
}
</style>
