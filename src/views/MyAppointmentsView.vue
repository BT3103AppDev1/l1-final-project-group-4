<script>
import TheHeader from '@/components/TheHeader.vue';
import AppointmentDetails from '@/components/AppointmentDetails.vue';
import { ref, computed } from 'vue';
import app from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { useStore } from 'vuex';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  components: {
    TheHeader,
    AppointmentDetails, 
    VueDatePicker
  },
  setup() {
    let selectedDate = ref('Select Date');

    function toIsoString(date) {
      var tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function (num) {
          return (num < 10 ? '0' : '') + num;
        };

      return (
        date.getFullYear() +
        '-' +
        pad(date.getMonth() + 1) +
        '-' +
        pad(date.getDate()) +
        'T' +
        pad(date.getHours()) +
        ':' +
        pad(date.getMinutes()) +
        ':' +
        pad(date.getSeconds()) +
        dif +
        pad(Math.floor(Math.abs(tzo) / 60)) +
        ':' +
        pad(Math.abs(tzo) % 60)
      );
    }

    const formattedDate = computed(() => {
      if (selectedDate.value instanceof Date) {
        return toIsoString(selectedDate.value).substring(0, 10);
        
      }
      return null;
    });

    const onDateSelected = (newDate) => {
      selectedDate.value = newDate;
    };

    return {
      selectedDate,
      formattedDate,
      onDateSelected
    }
  }
}

</script>


<template>
  <div class="main">
    <TheHeader />
    <div id="my-appts-body">
      <div id="date-container">
        <p id="select-date">Select Date</p>
        <VueDatePicker
          v-model="selectedDate"
          :enable-time-picker="false"
          auto-apply
          @update:modelValue="onDateSelected"
        ></VueDatePicker>
      </div>
      <div id="my-appts">
        
        <AppointmentDetails :newDate="formattedDate" />
      </div>
    </div>
  </div>
</template>

<style scoped>


.main {
  display: flex;
  height: 100vh;
  overflow: auto; /* Enable scrolling within the main container if needed */
}

#my-appts-body {
  background-color: rgb(215, 229, 243);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
}

#my-appts-header {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  text-decoration-line: underline;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  display: flex;
  justify-content: center;
}
#my-appts {
  width: 90%;
  height: 80%;
  background-color: #2c5b94;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  overflow-y: auto;
} 
#date-container {
  display: flex;
  align-items: center;
  margin-bottom: 2em;
}

#select-date {
  font-size: 27px;
  font-weight: bold;
  width: 10em;
}

</style>
