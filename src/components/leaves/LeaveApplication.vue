<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { computed, ref, onMounted } from 'vue';
import { collection, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import app from '../../firebase.js';
import Dropdown from 'primevue/dropdown';
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import PopUp from '@/components/PopUp.vue';

export default {
  components: {
    VueDatePicker,
    Dropdown,
    PopUp
  },
  setup() {
    const db = getFirestore(app);
    // for date selection
    const date = ref();
    // for employee name selection
    const selectedOptionEmployee = ref('Name');
    const isEmployeeMenuOpen = ref(false);
    const employees = ref([]);
    // for leave allowance display
    const prevLeaveBalance = ref(0);
    const requestedNumLeaves = ref(0);
    const remainingLeaveBalance = ref(0);
    const haveConflictLeaves = ref(false);
    const conflictLeaves = ref([]);
    // popup Message
    const popUpMsg = ref('');
    const show = ref(false);

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
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

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

    // get leave data
    const getLeaves = async () => {
      // reset input fields
      conflictLeaves.value = [];
      haveConflictLeaves.value = false;

      if (selectedOptionEmployee.value == 'Name') {
        return;
      }
      const querySnapshot = await getDocs(
        collection(db, 'schedule', 'leaves', selectedOptionEmployee.value.name)
      );
      querySnapshot.forEach((doc) => {
        if (doc.id == 'info') {
          prevLeaveBalance.value = doc.data().prevLeaveBalance;
        } else {
          try {
            console.log(doc.id);
            let currDate = new Date(new Date(doc.id).toDateString());
            let startDate = new Date(date.value[0].toDateString());
            let endDate = new Date(date.value[1].toDateString());
            // if employee applies for leaves that already exist
            if (currDate >= startDate && currDate <= endDate) {
              conflictLeaves.value.push(formatSingleDate(currDate));
            }
            if (conflictLeaves.value.length > 0) throw new Error('Conflict');

            let difference = date.value[1] - date.value[0];
            requestedNumLeaves.value = Math.ceil(difference / (1000 * 3600 * 24)) + 1;
            console.log(requestedNumLeaves.value);
            remainingLeaveBalance.value = prevLeaveBalance.value - requestedNumLeaves.value;
          } catch {
            // reset filled inputs
            haveConflictLeaves.value = true;
            selectedOptionEmployee.value = 'Name';
            conflictLeaves.value.forEach((element) => {
              console.log('Leave already applied on ', element);
            });
          }
        }
      });
    };

    const handleSubmit = async () => {
      if (selectedOptionEmployee.value == 'Name') {
        popUpMsg.value = 'Please select name';
        show.value = true;
        return;
      } else if (haveConflictLeaves.value == true) {
        popUpMsg.value = 'Please select dates that you have not already applied leave for';
        show.value = true;
        return;
      } else if (requestedNumLeaves.value > prevLeaveBalance.value) {
        popUpMsg.value = 'You cannot exceed your annual leave quota';
        show.value = true;
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
      //   console.log(infoRef.id);
    };

    // For demo purposes assign range from the current date
    onMounted(() => {
      const startDate = new Date();
      const endDate = new Date();
      date.value = [startDate, endDate];

      async function getEmployees() {
        const querySnapshot = await getDocs(collection(db, 'employees'));
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data().name);
          let documentData = doc.data();
          let employeeName = documentData.name;
          employees.value.push({ name: employeeName });
          //   console.log(employees);
        });
      }
      getEmployees();
    });
    return {
      date,
      format,
      formatSingleDate,
      selectedOptionEmployee,
      isEmployeeMenuOpen,
      handleClickOutsideEmployee,
      getLeaves,
      employees,
      prevLeaveBalance,
      remainingLeaveBalance: computed(() => prevLeaveBalance.value - requestedNumLeaves.value),
      haveConflictLeaves,
      conflictLeaves,
      show,
      popUpMsg,
      handleSubmit
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
        <button @click="handleSubmit" id="apply">Apply</button>
        <PopUp v-model="show">
          <h3 id="popup-msg">{{ popUpMsg }}</h3>
        </PopUp>
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
  justify-content: center;
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
