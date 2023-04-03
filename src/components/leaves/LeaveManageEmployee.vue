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
        });
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
  justify-content: flex-start;
  align-items: center;
}
.leaves {
  margin-top: 5%;
  overflow: scroll;
  list-style-type: none;
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
