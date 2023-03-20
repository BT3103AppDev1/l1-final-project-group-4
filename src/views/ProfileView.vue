<script>
import TheHeader from '../components/TheHeader.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  components: {
    TheHeader
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

    return {handleSubmit}
  }
}
</script>

<template>
  <main>

    <TheHeader /> 
    <button @click="handleSubmit()">Logout</button>
    <div class="profile">
      <h1>This is a profile page</h1>
    </div>
  </main>
</template>
