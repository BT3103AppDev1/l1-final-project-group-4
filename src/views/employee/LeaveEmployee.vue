<script>
import TheEmployeeHeader from '@/components/TheEmployeeHeader.vue';
import LeaveApplication from '../../components/leaves/LeaveApplication.vue';
import LeaveManageEmployee from '../../components/leaves/LeaveManageEmployee.vue';
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {
  components: {
    TheEmployeeHeader,
    LeaveApplication,
    LeaveManageEmployee
  },
  setup() {
    const store = useStore();
    const currPageIsApplications = ref(true);
    const currPageIsManage = ref(false);
    // get employee data
    const employees = ref([{ name: store.state.userName }]);

    const toggleToApplication = () => {
      currPageIsApplications.value = true;
      currPageIsManage.value = false;
    };
    const toggleToManage = () => {
      currPageIsApplications.value = false;
      currPageIsManage.value = true;
    };

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
    <TheEmployeeHeader />
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
      <LeaveManageEmployee v-if="currPageIsManage" />
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  overflow: hidden;
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
#toggle-button:hover {
  cursor: pointer;
  color: #193a6a;
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
