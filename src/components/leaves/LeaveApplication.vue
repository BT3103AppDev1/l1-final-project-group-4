<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { computed, ref, onMounted, toRefs } from 'vue';
import { collection, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import app from '../../firebase.js';
import Dropdown from 'primevue/dropdown';
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import PopUp from '@/components/PopUp.vue';
import LoadingPopUp from '@/components/LoadingPopUp.vue';
import loadingAudio from '../../assets/loadingAudio.mp3';

export default {
  components: {
    VueDatePicker,
    Dropdown,
    PopUp,
    LoadingPopUp
  },
  props: ['employees'],
  setup(props) {
    const db = getFirestore(app);
    // for date selection
    const date = ref();
    // for employee name selection
    const selectedOptionEmployee = ref('Name');
    const isEmployeeMenuOpen = ref(false);
    let { employees } = toRefs(props);
    // for leave allowance display
    const prevLeaveBalance = ref(0);
    const requestedNumLeaves = ref(0);
    const remainingLeaveBalance = ref(0);
    // conflict management
    const haveConflictLeaves = ref(false);
    const conflictLeaves = ref([]);
    const appts = ref([]);
    const conflictAppts = ref([]);
    const haveConflictAppts = ref(false);
    // popup Message
    const popUpMsg = ref('');
    const show = ref(false);
    // loading popup
    const isLoading = ref(false);
    const audio = ref(null);
    const playAudio = () => {
      audio.value.play();
    };
    const pauseAudio = () => {
      audio.value.pause();
    };

    // to format initial dates
    const resetDates = () => {
      const startDate = new Date();
      const endDate = new Date();
      date.value = [startDate, endDate];
    };
    // to format display of selected dates
    const format = (dates) => {
      if (dates[1] == null) return;

      // reset input fields
      selectedOptionEmployee.value = 'Name';
      // format dates
      const day1 = dates[0].getDate();
      const month1 = dates[0].getMonth() + 1;
      const year1 = dates[0].getFullYear();

      const day2 = dates[1].getDate();
      const month2 = dates[1].getMonth() + 1;
      const year2 = dates[1].getFullYear();

      return `${day1}/${month1}/${year1} ~ ${day2}/${month2}/${year2}`;
    };

    const formatSingleDate = (date) => {
      const day = new Date(date).getDate();
      const month = new Date(date).getMonth() + 1;
      const year = new Date(date).getFullYear();

      return `${day}/${month}/${year}`;
    };

    const formatSingleDateForFirebase = (date) => {
      let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
      let month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
      let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

      return `${year}-${month}-${day}`;
    };

    // Method to handle click outside event
    const handleClickOutsideEmployee = (event) => {
      const employeeMenu = document.querySelector('.dropdown.toggle');
      if (isEmployeeMenuOpen.value && employeeMenu && !employeeMenu.contains(event.target)) {
        isEmployeeMenuOpen.value = false;
      }
    };
    document.addEventListener('click', handleClickOutsideEmployee);

    const getAppts = async () => {
      console.log('getAppts Called');
      const querySnapshot = await getDocs(collection(db, 'new-appointments'));
      const slotArray = ['s1', 's2', 's3', 's4'];
      const promises = querySnapshot.docs.map(async (docDates) => {
        for (let j = 0; j < slotArray.length; j++) {
          const querySnapshot1 = await getDocs(
            collection(db, 'new-appointments/' + docDates.id + '/' + slotArray[j])
          );
          await Promise.all(
            querySnapshot1.docs.map(async (docc) => {
              let documentData = docc.data();
              let apptDate = documentData.appt_date;

              let groomer = documentData.appt_groomer;
              if (selectedOptionEmployee.value.name === groomer) {
                appts.value.push(apptDate);
                console.log(apptDate, ' pushed');
              }
            })
          );
        }
      });
      await Promise.all(promises);
    };

    // get leave data
    const getLeaves = async () => {
      console.log('Function runs');
      isLoading.value = true;
      playAudio();
      console.log('Loading is: ', isLoading.value);
      // reset input fields
      conflictLeaves.value = [];
      haveConflictLeaves.value = false;
      conflictAppts.value = [];
      appts.value = [];
      haveConflictAppts.value = false;
      await getAppts();

      if (selectedOptionEmployee.value == 'Name') {
        return;
      }

      const querySnapshot = await getDocs(
        collection(db, 'schedule', 'leaves', selectedOptionEmployee.value.name)
      );
      let startDate = new Date(date.value[0].toDateString());
      let endDate = new Date(date.value[1].toDateString());
      querySnapshot.forEach((doc) => {
        if (doc.id == 'info') {
          prevLeaveBalance.value = doc.data().prevLeaveBalance;
        } else {
          // console.log(doc.id);
          let currDate = new Date(new Date(doc.id).toDateString());
          // if employee applies for leaves that already exist
          if (currDate >= startDate && currDate <= endDate) {
            conflictLeaves.value.push(formatSingleDate(currDate));
          }
        }
      });

      // if employee applying for leave on day with appt
      var getDaysArray = function (s, e) {
        for (var a = [], d = new Date(s); d <= new Date(e); d.setDate(d.getDate() + 1)) {
          a.push(new Date(d));
        }
        return a;
      };
      var daylist = getDaysArray(date.value[0], date.value[1]);
      daylist.map((v) => v.toISOString().slice(0, 10)).join('');

      for (const day of daylist) {
        let dayFormatted = formatSingleDateForFirebase(day);
        for (var i = 0; i < appts.value.length; i++) {
          var app = appts.value[i];
          if (app === dayFormatted) {
            conflictAppts.value.push(formatSingleDate(dayFormatted));
          }
        }
      }
      console.log('conflict appts are ', conflictAppts.value);
      console.log('conflict leaves are ', conflictLeaves.value);
      if (conflictLeaves.value.length > 0) {
        haveConflictLeaves.value = true;
      }
      if (conflictAppts.value.length > 0) {
        haveConflictAppts.value = true;
      }

      let difference = endDate - startDate;
      requestedNumLeaves.value = Math.ceil(difference / (1000 * 3600 * 24)) + 1;
      console.log('Num of leaves requested: ', requestedNumLeaves.value);
      remainingLeaveBalance.value = prevLeaveBalance.value - requestedNumLeaves.value;

      if (haveConflictAppts.value || haveConflictLeaves.value) {
        // reset filled inputs
        console.log('CONFLICTS CAUGHT');
        conflictLeaves.value.forEach((element) => {
          console.log('Leave already applied on ', element);
        });
        conflictAppts.value.forEach((element) => {
          console.log('Existing appointment ', element);
        });
      }
      isLoading.value = false;
      pauseAudio();
      console.log('Loading is ', isLoading.value);
    };

    const handleSubmit = async () => {
      if (selectedOptionEmployee.value == 'Name') {
        popUpMsg.value = 'Please select name';
        show.value = true;
        return;
      } else if (haveConflictLeaves.value == true) {
        popUpMsg.value = 'Please select dates that you have not already applied leave for';
        show.value = true;
        resetDates();
        return;
      } else if (haveConflictAppts.value == true) {
        popUpMsg.value = 'Please deconflict any appointments first';
        show.value = true;
        resetDates();
        return;
      } else if (requestedNumLeaves.value > prevLeaveBalance.value) {
        popUpMsg.value = 'You cannot exceed your annual leave quota';
        show.value = true;
        resetDates();
        return;
      }
      popUpMsg.value = 'Your Leave Application has been confirmed';
      show.value = true;

      var getDaysArray = function (s, e) {
        for (var a = [], d = new Date(s); d <= new Date(e); d.setDate(d.getDate() + 1)) {
          a.push(new Date(d));
        }
        return a;
      };
      var daylist = getDaysArray(date.value[0], date.value[1]);
      daylist.map((v) => v.toISOString().slice(0, 10)).join('');

      for (const day of daylist) {
        const docRef = await setDoc(
          doc(
            db,
            'schedule',
            'leaves',
            selectedOptionEmployee.value.name,
            formatSingleDateForFirebase(day)
          ),
          { approved: false }
        );
        console.log(
          'Leave applied for ',
          formatSingleDateForFirebase(day),
          ' for ',
          selectedOptionEmployee.value
        );
      }
      let newLeaveBalance = prevLeaveBalance.value - requestedNumLeaves.value;
      const infoRef = await updateDoc(
        doc(db, 'schedule', 'leaves', selectedOptionEmployee.value.name, 'info'),
        {
          prevLeaveBalance: newLeaveBalance
        }
      );
      // rest input fields
      date.value = [];
      selectedOptionEmployee.value = 'Name';
    };

    // For demo purposes assign range from the current date
    onMounted(() => {
      console.log('Mounted runs');
      audio.value = new Audio(loadingAudio);
      audio.value.loop = true;
      const startDate = new Date();
      const endDate = new Date();
      date.value = [startDate, endDate];
      console.log('Mounted done');
    });
    return {
      date,
      format,
      formatSingleDate,
      selectedOptionEmployee,
      isEmployeeMenuOpen,
      handleClickOutsideEmployee,
      getLeaves,
      prevLeaveBalance,
      remainingLeaveBalance: computed(() => prevLeaveBalance.value - requestedNumLeaves.value),
      haveConflictLeaves,
      conflictLeaves,
      haveConflictAppts,
      conflictAppts,
      show,
      popUpMsg,
      handleSubmit,
      isLoading
    };
  }
};
</script>

<template>
  <div class="main">
    <div class="container">
      <h1>Leave Application Form</h1>
      <p>Only apply for leaves for this calendar year.</p>
      <!-- Row 1 -->
      <div class="row">
        <div class="column1">
          <h3>Dates Selected</h3>
        </div>
        <div class="column2">
          <VueDatePicker
            v-model="date"
            range
            :enable-time-picker="false"
            :format="format"
            :month-change-on-scroll="false"
          />
        </div>
      </div>
      <!-- Row 2 -->
      <div class="row">
        <div class="column1">
          <h3>Employee Name:</h3>
        </div>
        <div class="column2">
          <Dropdown
            v-model="selectedOptionEmployee"
            :options="employees"
            optionLabel="name"
            placeholder="Select a Name"
            class="w-full dropdown"
            @update:model-value="getLeaves"
          />
        </div>
      </div>
      <!-- Row 3 -->
      <div class="row">
        <div class="column1">
          <h3>Previous Leave Balance:</h3>
        </div>
        <div class="column2">
          <h3>{{ prevLeaveBalance }}</h3>
        </div>
      </div>
      <!-- Row 4 -->
      <div class="row">
        <div class="column1">
          <h3>New Leave Balance:</h3>
        </div>
        <div class="column2">
          <h3>{{ remainingLeaveBalance }}</h3>
        </div>
      </div>
      <div class="row">
        <p v-if="haveConflictLeaves" id="warning">
          You have already applied for leave on: {{ conflictLeaves }}
        </p>
        <p v-if="haveConflictAppts" id="warning">
          You have existing appointments on: {{ conflictAppts }}
        </p>
        <p v-if="haveConflictAppts" id="warning">
          Please deconflict these appointments before applying
        </p>
        <br />
        <button @click="handleSubmit" id="apply">Apply</button>
        <PopUp v-model="show">
          <h3 id="popup-msg">{{ popUpMsg }}</h3>
        </PopUp>
        <LoadingPopUp v-model="isLoading" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  width: 100%;
  height: 100%;
  /* background-color: antiquewhite; */
  text-align: center;
  justify-content: flex-start;
  align-items: center;
}
.container {
  display: flex;
  flex-direction: column;
  width: 60vw;
  /* background-color: gainsboro; */
  border: solid;
  border-width: 0.1em;
  border-radius: 1em;
  margin-top: 3%;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-inline: 1em;
  padding-block: 3vh;
}
.row:last-child {
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.column1 {
  display: flex;
  width: 70%;
  justify-content: flex-start;
}
.column2 {
  display: flex;
  width: 30%;
  justify-content: center;
}
#warning {
  color: red;
}
.dropdown {
  height: 40px;
  justify-content: center;
  align-items: center;
}
#apply {
  padding: 0.5em 1em;
  border: none;
  background-color: #2c5b94;
  color: white;
  font-weight: bold;
}
#apply:hover {
  background-color: #193a6a;
}
</style>
