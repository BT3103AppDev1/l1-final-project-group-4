<script>
import { toRefs, ref } from 'vue';
import { doc, deleteDoc, updateDoc, increment } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import app from '../../firebase.js';

export default {
  props: ['info'],
  setup(props) {
    const db = getFirestore(app);
    let { info } = toRefs(props);
    const deleted = ref(false);

    const deleteLeave = async () => {
      await deleteDoc(doc(db, 'schedule', 'leaves', info.value.name, info.value.date));
      console.log('Deleted');
      deleted.value = true;

      const docRef = doc(db, 'schedule', 'leaves', info.value.name, 'info');

      // Atomically increment the leave balance by 1.
      await updateDoc(docRef, {
        prevLeaveBalance: increment(1)
      });
    };

    return { deleteLeave, deleted };
  }
};
</script>

<template>
  <div class="leaveMain">
    <div class="nameContainer">
      <h4 class="name">{{ info.name }}</h4>
    </div>
    <div class="dateContainer">
      <h5 class="date">{{ info.date }}</h5>
    </div>
    <div class="deleteContainer">
      <img
        alt="Delete"
        src="@/assets/trash.png"
        class="delete"
        width="35"
        height="35"
        v-if="deleted == false"
        @click="deleteLeave"
      />
      <p v-if="deleted == true" class="deleted">Deleted</p>
    </div>
  </div>
</template>

<style scoped>
.leaveMain {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(215, 229, 243);
  flex-direction: row;
  border: solid;
  border-radius: 1em;
}
.nameContainer {
  display: flex;
  /* background-color: green; */
  width: 50%;
}
.name {
  display: flex;
  justify-self: flex-start;
  font-weight: bolder;
  font-size: 22px;
  margin-inline: 10px;
  /* width: 70%; */
}
.dateContainer {
  display: flex;
}
.date {
  font-size: 18px;
  display: flex;
}
.deleteContainer {
  display: flex;
}
.delete {
  display: flex;
  margin-inline: 10px;
}
.deleted {
  display: flex;
  margin-inline: 10px;
}
</style>
