<script>
import app from '../firebase.js';
import { watch } from 'vue';
import { getFirestore, doc, getDocs } from 'firebase/firestore';

import { useStore } from 'vuex';

export default {
  props: {
    newDate: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const db = getFirestore(app);
    const store = useStore();
    const userEmail = store.state.userEmail;

    watch(
      () => props.newDate,
      async (newValue) => {
        console.log("New date:", newValue);

        // Query the appointments collection for the document with the given date
        const apptRef = doc(db, 'appointments', newValue);
        console.log(apptRef.id)
        console.log(apptRef)
        console.log(typeof apptRef)

    


        
      }
    );
  }
};



</script>

<template>
    <div id = "appointments-container" > 
        <table id = "appointments-table"> </table>
        
    </div>
</template>

<style scoped>

</style>