<script>
import TheHeader from '@/components/TheHeader.vue';
import AppointmentPastDetails from '@/components/AppointmentPastDetails.vue';

export default {
  components: {
    TheHeader,
    AppointmentPastDetails
  },
  setup() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;

    return { date };
  }
};
</script>

<template>
  <div class="main">
    <TheHeader />
    <div id="my-appts-body">
      <div id="appts-header">
        <div id="headerappointmentsview">Past Appointments</div>
        <div id="route-container">
          <router-link to="/myappointments">
            <h3>Upcoming Appointments &#x2794;</h3>
          </router-link>
        </div>
      </div>
      <div id="my-appts">
        <AppointmentPastDetails :newDate="date" />
      </div>
    </div>
  </div>
</template>

<style scoped>
#route-container {
  margin-top: 0.8em;
  justify-self: flex-end;
  width: 16.9em;
}

a {
  text-decoration: none;
  color: grey;
}

h3 {
  font-weight: bold;
}

.main {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

#headerappointmentsview {
  width: 90%;
  font-size: 2em;
  font-weight: bold;
  padding-bottom: 0.5em;
  text-align: flex-start;
  justify-self: center;
  /* margin-left: 15%; */
}

#appts-header {
  height: 10%;
  width: 90%;
  display: flex;
  /* justify-content: center; */
  /* align-items: right; */
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
  display: flex;
  justify-content: center;
  overflow: scroll;
  height: 70vh;
}
</style>
