<script>
import TheEmployeeHeader from '@/components/TheEmployeeHeader.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import SchedulerSubHeader from '../../components/SchedulerSubHeader.vue';
import AppointmentTableEmployeeToday from '../../components/AppointmentTableEmployeeToday.vue';

export default {
  components: {
    TheEmployeeHeader,
    SchedulerSubHeader,
    AppointmentTableEmployeeToday
  },
  setup() {
    const errorMsg = ref(null);
    const store = useStore();
    const router = useRouter();
    const handleSubmit = async () => {
      try {
        await store.dispatch('logOut');
        router.push('/');
      } catch (err) {
        errorMsg.value = err.message;
      }
    };
    return { handleSubmit };
  }
};
</script>

<template>
  <div class="main">
    <TheEmployeeHeader />
    <div class="body">
      <SchedulerSubHeader />
      <div class="schedule">
        <div class="appointmentCard">
          <AppointmentTableEmployeeToday />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.body {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.subheader {
  height: 10%;
  align-items: baseline;
}
.schedule {
  display: flex;
  flex-direction: row;
  height: 100%;
}
.appointmentCard {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: scroll;
  padding: 0 3vw;
  max-height: 84vh;
  align-items: flex-start;
}
</style>
