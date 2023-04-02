<script>
import LeaveItem from './LeaveItem.vue';
import { onMounted, toRefs, ref } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import app from '../../firebase.js';

export default {
  components: {
    LeaveItem
  },
  props: ['employees'],
  setup(props) {
    const db = getFirestore(app);
    let { employees } = toRefs(props);
    // let employees = ref([{ name: 'mrBean' }]);
    const leaves = ref([]);
    onMounted(() => {
      // get leave data
      async function getLeaves() {
        for (const employee of employees.value) {
          const querySnapshot = await getDocs(collection(db, 'schedule', 'leaves', employee.name));
          console.log(employee.name);
          querySnapshot.forEach((doc) => {
            console.log(doc.id);
            if (doc.id != 'info') {
              leaves.value.push({ name: employee.name, date: doc.id });
            }
          });
        }
      }
      getLeaves();
    });

    return { leaves };
  }
};
</script>

<template>
  <div class="main">
    <ul class="leaves">
      <li v-for="item in leaves" v-bind:key="item.name" class="leaveItem">
        <LeaveItem :info="item" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
}
.leaves {
  margin-top: 5%;
  overflow: scroll;
  list-style-type: none;
  padding: 0;
  width: 80%;
  justify-content: center;
  text-align: center;
  border: solid;
  border-radius: 2em;
}
.leaveItem {
  padding: 1em;
}
</style>
