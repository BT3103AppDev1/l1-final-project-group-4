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
  <div class="leave-main">
    <div class="leave-info">
      <h4 class="leave-name">{{ info.name }}</h4>
      <h5 class="leave-date">{{ info.date }}</h5>
    </div>
    <div class="leave-action">
      <button class="delete" v-if="!deleted" @click="deleteLeave">
        <img alt="Delete" src="@/assets/trash.png" width="18" height="18" />
      </button>
      <p v-if="deleted" class="deleted">Deleted</p>
    </div>
  </div>
</template>

<style scoped>
.leave-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(215, 229, 243);
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
}

.leave-info {
  display: flex;
  flex-direction: column;
}

.leave-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.2rem;
}

.leave-date {
  font-size: 0.9rem;
  color: #666;
}

.leave-action {
  display: flex;
  align-items: center;
}

.delete {
  border: none;
  cursor: pointer;
  margin-left: 1rem;
  padding: 0;
  background-color: rgb(215, 229, 243);
}

.delete img {
  filter: grayscale(100%);
}

.deleted {
  color: #666;
  font-size: 0.8rem;
  margin-left: 1rem;
  text-transform: uppercase;
}
</style>
