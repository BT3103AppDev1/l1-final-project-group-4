<script>
import TheAdminHeader from '@/components/TheAdminHeader.vue';
import LeaveApplication from '../../components/leaves/LeaveApplication.vue';
import LeaveManage from '../../components/leaves/LeaveManage.vue';
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import app from '../../firebase.js';

export default {
  components: {
    TheAdminHeader,
    LeaveApplication,
    LeaveManage
  },
  setup() {
    const db = getFirestore(app);
    const currPageIsApplications = ref(true);
    const currPageIsManage = ref(false);
    // get employee data
    const employees = ref([]);

    const toggleToApplication = () => {
      currPageIsApplications.value = true;
      currPageIsManage.value = false;
    };
    const toggleToManage = () => {
      currPageIsApplications.value = false;
      currPageIsManage.value = true;
    };

    onMounted(() => {
      async function getEmployees() {
        const querySnapshot = await getDocs(collection(db, 'employees'));
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data().name);
          let documentData = doc.data();
          let employeeName = documentData.name;
          let employmentStatus = documentData.fullTime;
          employees.value.push({ name: employeeName, fullTime: employmentStatus });
          //   console.log(employees);
        });
      }
      getEmployees();
    });

    return {
      toggleToApplication,
      toggleToManage,
      currPageIsApplications,
      currPageIsManage,
      employees
    };
  }
};
</script>

<template>
  <div class="main">
    <TheAdminHeader />
    <div class="top-row">
      <div class="toggle-buttons">
        <h3 id="toggle-button" @click="toggleToApplication">Applications</h3>
        <h3 id="toggle-button" @click="toggleToManage">Manage</h3>
      </div>
      <div class="currPage">
        <h3 id="currPageTitle" v-if="currPageIsApplications">APPLICATIONS</h3>
        <h3 id="currPageTitle" v-if="currPageIsManage">MANAGE</h3>
      </div>
    </div>
    <div class="componentContainer">
      <LeaveApplication v-if="currPageIsApplications" :employees="employees" />
      <LeaveManage v-if="currPageIsManage" :employees="employees" />
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
}
.top-row {
  display: flex;
  justify-content: space-between;
}
.toggle-buttons {
  display: flex;
  flex-direction: row;
  /* padding-left: 3%; */
  /* background-color: green; */
  justify-content: flex-start;
}
#toggle-button {
  margin: 1em;
  color: #2c5b94;
}
.currPage {
  display: flex;
  margin: 1em 2em;
}
#currPageTitle {
  color: #2c5b94;
  font-weight: bold;
}
#apply {
  margin: 1em;
}
.componentContainer {
  display: flex;
}
</style>
