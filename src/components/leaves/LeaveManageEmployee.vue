<script>
import LeaveItem from './LeaveItem.vue';
import { onMounted, toRefs, ref } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { useStore } from 'vuex';
import app from '../../firebase.js';

export default {
  components: {
    LeaveItem
  },

  setup() {
    const db = getFirestore(app);
    const store = useStore();
    const employee = store.state.userName;
    // let employees = ref([{ name: 'mrBean' }]);
    const leaves = ref([]);
    const leaveAllowance = ref(0);
    const remainingLeaveAllowance = ref(0);
    onMounted(() => {
      // get leave data
      async function getLeaves() {
        const querySnapshot = await getDocs(collection(db, 'schedule', 'leaves', employee));
        console.log(employee);
        querySnapshot.forEach((doc) => {
          console.log(doc.id);
          if (doc.id != 'info') {
            leaves.value.push({ name: employee, date: doc.id });
          }
          if (doc.id == 'info') {
            const data = doc.data();
            leaveAllowance.value = data.allowance;
            remainingLeaveAllowance.value = data.prevLeaveBalance;
          }
        });
      }
      getLeaves();
    });

    return { leaves, leaveAllowance, remainingLeaveAllowance };
  }
};
</script>

<template>
  <div class="main">
    <h1 class="title">Your Leaves</h1>
    <p class="allowance">Leave Allowance: {{ leaveAllowance }} days</p>
    <p class="allowance">Remaining Leave Allowance: {{ remainingLeaveAllowance }} days</p>
    <ul class="leaves">
      <li v-for="item in leaves" v-bind:key="item.name">
        <LeaveItem :info="item" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.allowance {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.leaves {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 500px;
}
</style>
