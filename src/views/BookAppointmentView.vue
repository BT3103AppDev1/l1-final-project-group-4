<script>
//need to pull from database the pet name, avai date and time!!
import TheHeader from '@/components/TheHeader.vue';
import AppointmentPopUp from '@/components/AppointmentPopUp.vue';
import { ref } from 'vue';
import app from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { doc, collection, getDocs, setDoc, addDoc, getCountFromServer } from 'firebase/firestore';
import { useStore } from 'vuex';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  components: {
    TheHeader,
    AppointmentPopUp,
    VueDatePicker
  },
  setup() {
    const db = getFirestore(app);
    const store = useStore();

    const userEmail = store.state.userEmail;
    const userName = store.state.userName;

    let selectedOptionPet = ref('Select Pet');
    let selectedOptionService = ref('Select Service');
    let date = ref('Select Date');
    let selectedOptionTime = ref('Select Time');
    let selectedOptionTimeSlot = ref('');

    let isServiceMenuOpen = ref(false);
    let isPetMenuOpen = ref(false);
    let isTimeMenuOpen = ref(false);

    // Method to handle click outside event
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

    // Attach click event listener to document
    document.addEventListener('click', handleClickOutsideService);
    document.addEventListener('click', handleClickOutsidePet);
    document.addEventListener('click', handleClickOutsideTime);

    let show = ref(false);

    async function getDogs() {
      const docRef = doc(db, 'customers', userEmail);
      const querySnapshot = await getDocs(collection(docRef, 'dogs'));

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, ' => ', doc.data());
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

    async function getSlots() {
      if (date.value == 'Select Date') {
        return;
      }

      let ul = document.getElementById('select-time');
      ul.innerHTML = '';

      let li1 = document.createElement('li');
      ul.appendChild(li1);
      let a1 = document.createElement('a');
      a1.id = 's1';
      a1.href = '#';
      a1.onclick = function () {
        selectedOptionTime.value = '9:00AM - 11:00AM';
        selectedOptionTimeSlot.value = 's1';
        isTimeMenuOpen.value = false;
      };
      a1.innerHTML = '9:00AM - 11:00AM';
      li1.appendChild(a1);

      let li2 = document.createElement('li');
      ul.appendChild(li2);
      let a2 = document.createElement('a');
      a2.id = 's2';
      a2.href = '#';
      a2.onclick = function () {
        selectedOptionTime.value = '11:00AM - 1:00PM';
        selectedOptionTimeSlot.value = 's2';
        isTimeMenuOpen.value = false;
      };
      a2.innerHTML = '11:00AM - 1:00PM';
      li2.appendChild(a2);

      let li3 = document.createElement('li');
      ul.appendChild(li3);
      let a3 = document.createElement('a');
      a3.id = 's3';
      a3.href = '#';
      a3.onclick = function () {
        selectedOptionTime.value = '2:00PM - 4:00PM';
        selectedOptionTimeSlot.value = 's3';
        isTimeMenuOpen.value = false;
      };
      a3.innerHTML = '2:00PM - 4:00PM';
      li3.appendChild(a3);

      let li4 = document.createElement('li');
      ul.appendChild(li4);
      let a4 = document.createElement('a');
      a4.id = 's4';
      a4.href = '#';
      a4.onclick = function () {
        selectedOptionTime.value = '4:00PM - 6:00PM';
        selectedOptionTimeSlot.value = 's4';
        isTimeMenuOpen.value = false;
      };
      a4.innerHTML = '4:00PM - 6:00PM';
      li4.appendChild(a4);

      for (let i = 1; i <= 4; i++) {
        const docid = 's' + i;
        const coll = collection(
          db,
          'appointments/' + date.value.toISOString().substring(0, 10) + '/' + docid
        );
        const snapshot = await getCountFromServer(coll);
        // console.log('count: ' + i, snapshot.data().count);
        if (snapshot.data().count >= 3) {
          console.log('cant select: ' + docid);
          let a = document.getElementById(docid);
          a.className = 'disabled';
        }
      }
    }

    async function showPopUp() {
      show.value = true;
      console.log(
        selectedOptionPet.value,
        selectedOptionService.value,
        date.value.toISOString().substring(0, 10),
        selectedOptionTime.value,
        selectedOptionTimeSlot.value
      );

      await setDoc(doc(db, 'appointments', date.value.toISOString().substring(0, 10)), {
        date: date.value.toISOString().substring(0, 10)
      });

      await addDoc(
        collection(
          db,
          'appointments/' +
            date.value.toISOString().substring(0, 10) +
            '/' +
            selectedOptionTimeSlot.value
        ),
        {
          appt_date: date.value.toISOString().substring(0, 10),
          appt_pet: selectedOptionPet.value,
          appt_time: selectedOptionTime.value,
          appt_email: userEmail,
          appt_name: userName
        }
      );
    }

    return {
      userEmail,
      selectedOptionPet,
      selectedOptionService,
      date,
      selectedOptionTime,
      isServiceMenuOpen,
      isPetMenuOpen,
      isTimeMenuOpen,
      show,
      getSlots,
      handleClickOutsideService,
      handleClickOutsidePet,
      handleClickOutsideTime,
      showPopUp
    };
  }
};
</script>

<template>
  <div class="main">
    <TheHeader />

    <div class="body">
      <form class="form-container">
        <div class="sched-appt">Schedule your appointment now!</div>

        <div class="select-pet">Select Pet</div>
        <div class="dropdown toggle">
          <input id="t1" type="checkbox" checked v-model="isPetMenuOpen" />
          <label for="t1" id="dropdownlabel1" v-text="selectedOptionPet"></label>

          <ul id="select-pet" v-show="isPetMenuOpen"></ul>
        </div>

        <br />

        <div class="select-service">Select Service</div>
        <div class="dropdown toggle" id="services">
          <input id="t2" type="checkbox" checked v-model="isServiceMenuOpen" />
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

        <div class="select-date">Select Date</div>
        <div class="dropdown toggle" id="date">
          <VueDatePicker v-model="date" :enable-time-picker="false" auto-apply></VueDatePicker>
        </div>

        <br />

        <div class="select-time">Select Time</div>
        <div class="dropdown toggle" id="time">
          <input id="t4" type="checkbox" checked v-model="isTimeMenuOpen" @click="getSlots" />
          <label for="t4" id="dropdownlabel4" v-text="selectedOptionTime"></label>

          <ul id="select-time" v-show="isTimeMenuOpen"></ul>
        </div>

        <br />
        <br />

        <button id="submit-button" type="button" v-on:click="showPopUp">Submit</button>
      </form>

      <div class="appt-img">
        <img id="dogs" src="@/assets/appts-img.png" />
      </div>
    </div>

    <AppointmentPopUp v-model="show"> </AppointmentPopUp>
  </div>
</template>

<style>
.main {
  height: 100vh;
  width: 100vw;
}
.body {
  height: 100%;
  width: 100%;
  display: flex;
  background-color: rgb(215, 229, 243);
  justify-content: center;
  align-items: center;
}

.sched-appt {
  font-weight: bold;
  font-size: 40px;
  padding-bottom: 20px;
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

.form-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 400px;
  height: 70%;
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

.disabled {
  pointer-events: none;
  background-color: grey !important;
}
</style>
