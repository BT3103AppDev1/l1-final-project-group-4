<script>
import TheHeader from '@/components/TheHeader.vue';
import AppointmentDetails from '@/components/AppointmentDetails.vue';



export default {
  components: {
    TheHeader,
    AppointmentDetails, 
  
  },
  setup() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;

 

    return { date }
    }
}

</script>


<template>
  <div class="main">
    <TheHeader />
    <div id="my-appts-body">
      <div id="appts-header">
        <p style="font-size:2em; font-weight:bold; text-decoration:underline; padding-bottom: 0.5em;"> Upcoming Appointments</p>
        
      </div>
      <div id="my-appts">
        <AppointmentDetails :newDate=date />
      </div>
    </div>
  </div>
</template>

<style scoped>


.main {
  display: flex;
  height: 100vh;
  
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



</style>
