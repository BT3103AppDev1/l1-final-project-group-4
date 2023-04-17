<script>
//need to pull from database the pet name, avai date and time!!
import TheHeader from '@/components/TheHeader.vue';
import AppointmentPopUp from '@/components/AppointmentPopUp.vue';
import LoadingPopUp from '@/components/LoadingPopUp.vue';
import { ref, onMounted } from 'vue';
import app from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import {
  doc,
  collection,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  getCountFromServer
} from 'firebase/firestore';
import { useStore } from 'vuex';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import loadingAudio from '../assets/loadingAudio.mp3';

export default {
  components: {
    TheHeader,
    AppointmentPopUp,
    LoadingPopUp,
    VueDatePicker
  },
  computed: {
    // minDate to select where they can book their appointment. Set to today.
    minDate() {
      const now = new Date();
      now.setDate(now.getDate());
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  },

  setup() {
    const db = getFirestore(app);
    const store = useStore();

    // store variables
    const userEmail = store.state.userEmail;
    const userName = store.state.userName;

    // creating refs
    let selectedOptionPet = ref('Select Pet');
    let selectedOptionService = ref('Select Service');
    let selectedDate = ref('Select Date');
    let selectedOptionTime = ref('Select Time');
    let selectedOptionTimeSlot = ref('');
    let popUpMsg = ref('Your appointment has been confirmed!');

    let isServiceMenuOpen = ref(false);
    let isPetMenuOpen = ref(false);
    let isTimeMenuOpen = ref(false);

    // loading popup
    const isLoading = ref(false);
    const audio = ref(null);
    const playAudio = () => {
      audio.value.play();
    };
    const pauseAudio = () => {
      audio.value.pause();
    };

    // Methods to handle click outside events
    function handleClickOutsidePet(event) {
      const petMenu = document.querySelector('.dropdown.toggle');
      if (isPetMenuOpen.value && petMenu && !petMenu.contains(event.target)) {
        isPetMenuOpen.value = false;
      }
    }

    function handleClickOutsideService(event) {
      const serviceMenu = document.querySelector('#services');
      if (isServiceMenuOpen.value && serviceMenu && !serviceMenu.contains(event.target)) {
        isServiceMenuOpen.value = false;
      }
    }

    function handleClickOutsideTime(event) {
      const timeMenu = document.querySelector('#time');
      if (isTimeMenuOpen.value && timeMenu && !timeMenu.contains(event.target)) {
        isTimeMenuOpen.value = false;
      }
    }

    function toIsoString(date) {
      var tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function (num) {
          return (num < 10 ? '0' : '') + num;
        };

      return (
        date.getFullYear() +
        '-' +
        pad(date.getMonth() + 1) +
        '-' +
        pad(date.getDate()) +
        'T' +
        pad(date.getHours()) +
        ':' +
        pad(date.getMinutes()) +
        ':' +
        pad(date.getSeconds()) +
        dif +
        pad(Math.floor(Math.abs(tzo) / 60)) +
        ':' +
        pad(Math.abs(tzo) % 60)
      );
    }

    // Attach click event listener to document
    document.addEventListener('click', handleClickOutsideService);
    document.addEventListener('click', handleClickOutsidePet);
    document.addEventListener('click', handleClickOutsideTime);

    let show = ref(false);

    // function to get all dogs belonging to owner
    async function getDogs() {
      const docRef = doc(db, 'users', userEmail);
      const querySnapshot = await getDocs(collection(docRef, 'dogs'));

      querySnapshot.forEach((doc) => {
        let documentData = doc.data();
        let dogName = documentData.dog_name;

        let ul = document.getElementById('select-pet');
        let li = document.createElement('li');
        ul.appendChild(li);

        let a = document.createElement('a');
        a.href = '#';
        a.onclick = function () {
          selectedOptionPet.value = dogName;
          isPetMenuOpen.value = false;
        };
        a.innerHTML = dogName;
        li.appendChild(a);
      });
    }
    getDogs();

    // function to get slots for the selected Date
    async function getSlots() {
      isLoading.value = true;
      // plays music
      playAudio();

      if (selectedDate.value == 'Select Date' || selectedDate.value == null) {
        isLoading.value = false;
        pauseAudio();
        return;
      }

      isLoading.value = true;
      playAudio();

      // made helper function to count available employees at given timeslot
      async function countAvailableEmployees() {
        var counter = 0;
        const querySnapshot = await getDocs(collection(db, 'employees'));
        for (const d of querySnapshot.docs) {
          let documentData = d.data();
          let employeeName = documentData.name;

          const docRef = doc(
            db,
            'schedule/leaves/' + employeeName,
            toIsoString(selectedDate.value).substring(0, 10)
          );
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log(employeeName + ' On leave:', docSnap.data());
          } else {
            console.log(employeeName + ' No leave');
            counter++;
          }
        }
        return counter;
      }

      getAvailableSlots(await countAvailableEmployees());
    }

    // function that gets available slots from the employee count and create the dropdown elements.
    // if slot is unavailable. Slot cannot be selected
    async function getAvailableSlots(employeeCount) {
      let ul = document.getElementById('select-time');
      ul.innerHTML = '';

      const map = new Map([
        ['s1', '9:00AM - 11:00AM'],
        ['s2', '11:00AM - 1:00PM'],
        ['s3', '2:00PM - 4:00PM'],
        ['s4', '4:00PM - 6:00PM']
      ]);

      let li1 = document.createElement('li');
      let li2 = document.createElement('li');
      let li3 = document.createElement('li');
      let li4 = document.createElement('li');
      const lis = [li1, li2, li3, li4];

      for (let i = 1; i <= 4; i++) {
        const docid = 's' + i;
        const coll = collection(
          db,
          'new-appointments/' + toIsoString(selectedDate.value).substring(0, 10) + '/' + docid
        );
        const snapshot = await getCountFromServer(coll);
        // console.log('count: ' + i, snapshot.data().count);

        let a = document.createElement('a');
        a.id = docid;
        a.href = '#';
        a.onclick = function () {
          selectedOptionTime.value = map.get(docid);
          selectedOptionTimeSlot.value = docid;
          isTimeMenuOpen.value = false;
        };
        a.innerHTML = map.get(docid);
        lis[i - 1].appendChild(a);

        if (snapshot.data().count >= employeeCount) {
          // console.log('cant select: ' + docid);
          a.className = 'disabled';
        }
      }

      for (let i = 0; i < lis.length; i++) {
        ul.appendChild(lis[i]);
      }
      isLoading.value = false;
      pauseAudio();
      // console.log('Loading is ', isLoading.value);
    }

    // handling submit function
    async function handleSubmit() {
      if (selectedOptionPet.value == 'Select Pet') {
        popUpMsg.value = 'Please select pet';
        show.value = true;
        return;
      } else if (selectedOptionService.value == 'Select Service') {
        popUpMsg.value = 'Please select service';
        show.value = true;
        return;
      } else if (selectedOptionTime.value == 'Select Time') {
        popUpMsg.value = 'Please select time';
        show.value = true;
        return;
      }

      popUpMsg.value = 'Your appointment has been confirmed!';
      show.value = true;
      console.log(
        selectedOptionPet.value,
        selectedOptionService.value,
        toIsoString(selectedDate.value).substring(0, 10),
        selectedOptionTime.value,
        selectedOptionTimeSlot.value
      );

      const coll = collection(
        db,
        'new-appointments/' +
          toIsoString(selectedDate.value).substring(0, 10) +
          '/' +
          selectedOptionTimeSlot.value
      );
      const snapshot = await getCountFromServer(coll);
      let counter = snapshot.data().count + 1;

      let id =
        toIsoString(selectedDate.value).substring(0, 10).replaceAll('-', '') +
        selectedOptionTimeSlot.value.toUpperCase() +
        counter;

      // sets doc to allow doc to accessed
      await setDoc(doc(db, 'new-appointments', toIsoString(selectedDate.value).substring(0, 10)), {
        date: toIsoString(selectedDate.value).substring(0, 10)
      });

      // add doc in subcollection
      await addDoc(
        collection(
          db,
          'new-appointments/' +
            toIsoString(selectedDate.value).substring(0, 10) +
            '/' +
            selectedOptionTimeSlot.value
        ),
        {
          appt_id: id,
          appt_date: toIsoString(selectedDate.value).substring(0, 10),
          appt_pet: selectedOptionPet.value,
          appt_time: selectedOptionTime.value,
          appt_email: userEmail,
          appt_name: userName,
          appt_service: selectedOptionService.value,
          appt_groomer: null,
          status_bath: 0,
          status_cut: 0,
          status_groom: 0
        }
      );
    }
    onMounted(() => {
      audio.value = new Audio(loadingAudio);
      audio.value.loop = true;
    });

    return {
      userEmail,
      selectedOptionPet,
      selectedOptionService,
      selectedDate,
      selectedOptionTime,
      isServiceMenuOpen,
      isPetMenuOpen,
      isTimeMenuOpen,
      show,
      isLoading,
      popUpMsg,
      getSlots,
      handleClickOutsideService,
      handleClickOutsidePet,
      handleClickOutsideTime,
      handleSubmit
    };
  }
};
</script>

<template>
  <div class="main">
    <TheHeader />
    <div id="book-appt-body">
      <div class="appt-details">
        <form class="form-container">
          <p class="sched-appt">Schedule your appointment now!</p>
          <div class="dropdown toggle form-group">
            <p class="select-pet">Select Pet</p>
            <input id="t1" type="checkbox" v-model="isPetMenuOpen" required />
            <label for="t1" id="dropdownlabel1" v-text="selectedOptionPet"></label>
            <ul id="select-pet" v-show="isPetMenuOpen"></ul>
          </div>

          <br />

          <div class="dropdown toggle form-group" id="services">
            <p class="select-service">Select Service</p>
            <input id="t2" type="checkbox" v-model="isServiceMenuOpen" required />
            <label for="t2" id="dropdownlabel2" v-text="selectedOptionService"></label>

            <ul v-show="isServiceMenuOpen">
              <li>
                <a
                  href="#"
                  @click.stop="
                    selectedOptionService = 'Basic Grooming';
                    isServiceMenuOpen = false;
                  "
                  >Basic Grooming</a
                >
              </li>
              <li>
                <a
                  href="#"
                  @click.stop="
                    selectedOptionService = 'Full Grooming';
                    isServiceMenuOpen = false;
                  "
                  >Full Grooming</a
                >
              </li>
              <li>
                <a
                  href="#"
                  @click.stop="
                    selectedOptionService = 'Teeth Cleaning';
                    isServiceMenuOpen = false;
                  "
                  >Teeth Cleaning</a
                >
              </li>
              <li>
                <a
                  href="#"
                  @click.stop="
                    selectedOptionService = 'Spa Treatment';
                    isServiceMenuOpen = false;
                  "
                  >Spa Treatment</a
                >
              </li>
            </ul>
          </div>

          <br />

          <div class="dropdown toggle form-group" id="date">
            <p class="select-date">Select Date</p>
            <VueDatePicker
              v-model="selectedDate"
              :enable-time-picker="false"
              auto-apply
              @update:model-value="getSlots"
              :min-date="minDate"
            ></VueDatePicker>
          </div>

          <br />

          <div class="dropdown toggle form-group" id="time">
            <p class="select-time">Select Time</p>
            <input id="t4" type="checkbox" v-model="isTimeMenuOpen" required />
            <label for="t4" id="dropdownlabel4" v-text="selectedOptionTime"></label>

            <ul id="select-time" v-show="isTimeMenuOpen"></ul>
          </div>

          <br />

          <button id="submit-button" type="button" @click="handleSubmit">Submit</button>
        </form>
      </div>

      <div class="appt-picture">
        <img id="dogs" src="@/assets/appts-img.png" />
      </div>

      <AppointmentPopUp v-model="show">
        <h3 id="popup-msg">{{ popUpMsg }}</h3>
      </AppointmentPopUp>
      <LoadingPopUp v-model="isLoading" />
    </div>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  overflow: hidden; /* Prevent scrolling */
  background-color: rgb(215, 229, 243);
}

.main {
  display: flex;
  height: 100vh;
  overflow: auto; /* Enable scrolling within the main container if needed */
}

#book-appt-body {
  background-color: rgb(215, 229, 243);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
}

.appt-details {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
}

.appt-picture {
  display: flex;
  flex-direction: row;
  margin-top: 4em;
}
.sched-appt {
  font-weight: bold;
  font-size: 40px;
  padding-bottom: 0.5em;
  padding-top: 0.5em;
}

.form-container {
  margin-left: 5em;
  margin-right: 5em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 400px;
}

#dropdown-menu {
  max-height: 200px;
  overflow-y: scroll;
  position: absolute;
  width: 100%;
  color: black;
  box-shadow: 0 6px 5px -5px rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.select-service,
.select-pet,
.select-date,
.select-time,
.select-location {
  font-weight: bold;
}

#dogs {
  height: 450px;
}

.dropdown {
  width: 300px;
}
.dropdown.toggle > input {
  display: none;
}

.dropdown > a,
.dropdown.toggle > label {
  border-radius: 2px;
  box-shadow: 0 6px 5px -5px rgba(0, 0, 0, 0.3);
}

.dropdown > a::after,
.dropdown.toggle > label::after {
  content: '';
  float: right;
  margin: 15px 15px 0 0;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 10px solid #ccc;
}
.dropdown ul {
  list-style-type: none;
  display: block;
  margin: 0;
  padding: 0;
  position: absolute;
  width: 100%;
  box-shadow: 0 6px 5px -5px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  z-index: 1;
}
.dropdown a,
.dropdown.toggle > label {
  display: block;
  padding: 0 0 0 10px;
  text-decoration: none;
  line-height: 40px;
  font-size: 13px;
  text-transform: uppercase;
  font-weight: bold;
  color: #999;
  background-color: #fff;
}
.dropdown li {
  height: 0;
  overflow: hidden;
  transition: all 500ms;
}

.dropdown.hover li {
  transition-delay: 300ms;
}

.dropdown a:hover,
.dropdown.toggle > label:hover,
.dropdown.toggle > input:checked ~ label {
  background-color: #eee;
  color: #666;
}

.dropdown.toggle > input:checked ~ ul li {
  height: 40px;
}

#submit-button {
  background-color: #2c5b94;
  color: #fff;
  border: none;
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border-radius: 0.5em;
}

.disabled {
  pointer-events: none;
  background-color: grey !important;
}

#popup-msg {
  text-align: center;
}
@media (max-width: 1040px) {
  .appt-picture {
    display: none;
  }
  .appt-details {
    justify-self: center;
  }
}
</style>
