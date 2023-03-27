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

  <body>
    <TheAdminHeader />
    <div>
      <h1>This is Scheduler Admin Page</h1>

      <table id="table" class="auto-index">
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
      </table>
      <EmployeeProfileCard />
    </div>
  </body>
</template>

<style>
main {
  height: 100vh;
  display: flex;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 70%;
}

th,
td {
  border: 3px solid red;
  font-weight: bold;
}
</style>

