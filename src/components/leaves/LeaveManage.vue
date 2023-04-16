<script>
import { toRefs, ref } from 'vue';
import { collection, getDocs, doc, deleteDoc, updateDoc, increment } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import app from '../../firebase.js';
import Dropdown from 'primevue/dropdown';
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

export default {
  components: {
    Dropdown
  },
  props: ['employees'],
  setup(props) {
    const db = getFirestore(app);
    let { employees } = toRefs(props);
    const selectedOptionEmployee = ref('Name');
    // let employees = ref([{ name: 'mrBean' }]);
    const leaves = ref([]);
    const isClicked = ref([]);

    // fetch leave data from firestore
    const getLeaves = async () => {
      leaves.value = []; // Reset leaves array and isClicked
      isClicked.value = {}; 
      const querySnapshot = await getDocs(
        collection(db, 'schedule', 'leaves', selectedOptionEmployee.value.name)
      ); 
      querySnapshot.forEach((doc) => {
        console.log(doc.id);
        // Exclude 'info' document
        if (doc.id != 'info') {
          // Update leaves array with leave data and isClicked
          leaves.value.push({ name: selectedOptionEmployee, date: doc.id }); 
          isClicked.value[doc.id] = false;
        }
      });
      console.log(leaves);
    };
    // Function to toggle clicked state
    const clicked = (date) => {
      isClicked.value[date] = !isClicked.value[date]; // Toggle clicked state
      console.log(isClicked.value);
    };
    // Function to handle submit for deleting leave items
    const handleSubmit = async () => {
      console.log('deleted');
      for (var key in isClicked.value) {
        if (isClicked.value[key]) {
          // If leave item is clicked
          await deleteDoc(doc(db, 'schedule', 'leaves', selectedOptionEmployee.value.name, key)); 
          console.log('Deleted');

          const docRef = doc(db, 'schedule', 'leaves', selectedOptionEmployee.value.name, 'info');

          await updateDoc(docRef, {
            prevLeaveBalance: increment(1)
          });
        }
      }
      getLeaves();
    };
     // Function to handle clear action for resetting clicked state of leave items
    const handleClear = () => {
      console.log('cleared');
      for (var key in isClicked.value) {
        isClicked.value[key] = false;
      }
    };
    return {
      leaves,
      selectedOptionEmployee,
      isClicked,
      clicked,
      getLeaves,
      handleSubmit,
      handleClear
    };
  }
};
</script>

<template>
  <div class="main">
    <div class="leave-container">
      <div class="row">
        <h3 id="label">Name:</h3>
        <Dropdown
          v-model="selectedOptionEmployee"
          :options="employees"
          optionLabel="name"
          placeholder="Select a Name"
          class="w-full dropdown"
          @update:model-value="getLeaves"
        />
      </div>
      <div class="row">
        <h3 id="label">Employment Type:</h3>
        <h3>{{ selectedOptionEmployee.fullTime }}</h3>
      </div>
      <div class="row">
        <h3 id="label">Upcoming Dates:</h3>
        <div class="scrollable">
          <div class="dateContainer" v-for="leave in leaves" :key="leave">
            <button
              id="leaveButton"
              :class="{ active: isClicked[leave.date], inactive: !isClicked[leave.date] }"
              @click="clicked(leave.date)"
            >
              {{ leave.date }}
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <button class="submit" @click="handleSubmit">Delete</button>
        <button class="submit" @click="handleClear">Clear</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  text-align: center;
  justify-content: flex-start;
  align-items: center;
}
.leave-container {
  display: flex;
  margin-top: 5%;
  width: 80%;
  height: 60%;
  border: solid;
  border-radius: 2em;
  flex-direction: column;
}
.row {
  margin: 2em 4em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1em;
  align-items: center;
}
#label {
  font-weight: bold;
  display: flex;
}
.dropdown {
  height: 40px;
  justify-content: center;
  align-items: center;
}
.dateContainer {
  display: flex;
}
#leaveButton {
  width: 100px;
  margin-inline: 2em;
  border: none;
  color: white;
  border-radius: 1em;
}
#leaveButton:hover {
  background-color: #193a6a;
}
.inactive {
  background-color: #2c5b94;
}
.active {
  background-color: red;
}
.scrollable {
  display: flex;
  width: 70%;
  overflow-x: scroll;
  min-height: 50px;
}
.scrollable::-webkit-scrollbar {
  -webkit-appearance: auto;
}
.scrollable::-webkit-scrollbar:horizontal {
  padding-top: 2em;
  height: 11px;
}
.scrollable::-webkit-scrollbar-thumb {
  border-radius: 8px;
  border: 1px solid white; /* should match background, can't be transparent */
  background-color: rgba(0, 0, 0, 0.5);
}
.submit {
  margin-inline: 2em;
  border: none;
  color: white;
  border-radius: 1em;
  background-color: #2c5b94;
  padding: 1em 2em;
}
.submit:hover {
  background-color: #193a6a;
}
</style>
