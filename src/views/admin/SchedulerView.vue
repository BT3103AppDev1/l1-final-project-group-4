<script>
import TheAdminHeader from '@/components/TheAdminHeader.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import EmployeeProfileCard from '../../components/EmployeeProfileCard.vue'

export default {
  components: {
    TheAdminHeader,
    EmployeeProfileCard
  },
  setup() {
    const errorMsg = ref(null)
    const store = useStore()
    const router = useRouter()
    const handleSubmit = async () => {
      try {
        await store.dispatch('logOut')
        router.push('/')
      } catch (err) {
        errorMsg.value = err.message
      }
    }
    return { handleSubmit, TheAdminHeader, EmployeeProfileCard }
  }

}
</script>

<template>

  <div class="main">
    <TheAdminHeader />
    <div class="body">
      <h1>This is Scheduler Admin Page</h1>

      <!-- <table id="table" class="auto-index">
        <tr>
          <th>S.NO</th>
          <th>BOOKING ID</th>
          <th>EMAIL</th>
          <th>CUSTOMER</th>
          <th>PET</th>
          <th>DATE</th>
          <th>TIME</th>
          <th>EMPLOYEE</th>
        </tr>
      </table> -->
      <div class="schedule">
        <!-- <EmployeeProfileCard /> -->
        <h1>HEHE</h1>
        <div class="employeeCard">
          <EmployeeProfileCard />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.main {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.body {
  display: flex;
  flex-direction: column;
  background-color: green;
  height: 100%;
}
#table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 70%;
  flex-direction: column;
}
.schedule {
  display:flex;
  background-color: gold;
  height: 100%;
  flex-direction:row;
  justify-content:space-between;
  flex-wrap: nowrap;
}
.employeeCard {
  background-color: pink;

}

th,
td {
  border: 3px solid red;
  font-weight: bold;
}
</style>

