<script>
import TheAdminHeader from '@/components/TheAdminHeader.vue';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import EmployeeProfileCard from '../../components/EmployeeProfileCard.vue';
import SchedulerSubHeader from '../../components/SchedulerSubHeader.vue';
import AppointmentTableOwner from '../../components/AppointmentTableOwner.vue';


export default {
  components: {
    TheAdminHeader,
    SchedulerSubHeader,
    AppointmentTableOwner
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
    return { handleSubmit, TheAdminHeader, EmployeeProfileCard ,
      user: computed(() => store.state.user),
      authIsReady: computed(() => store.state.authIsReady),
      employee: computed(() => store.state.isEmployee),
    }
    
  }
};
</script>

<template>
  <div class="main">
    <TheAdminHeader />
    <div class="body">
      <div class="subheader">
        <SchedulerSubHeader />
      </div>
      <div class="schedule">
        <div class="appointmentCard">
          <AppointmentTableOwner />
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

.employeeCard {
  display: flex;
  padding-right: 20px;
  width: 2 0%;
  align-self: flex-start;
}
</style>
