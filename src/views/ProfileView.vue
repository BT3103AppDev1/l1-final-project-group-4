<script>
import TheHeader from '@/components/TheHeader.vue'
import ProfileCard from '@/components/ProfileCard.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  components: {
    TheHeader,
    ProfileCard
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
    return { handleSubmit }
  }
}
</script>

<template>
  <div class="main">
    <TheHeader class="header" />
    <div class="body">
      <ProfileCard />
      <button @click="handleSubmit()">Logout</button>
      <div id="body-content">
        <h1>content</h1>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  height: 100vh;
}
.body {
  background-color: #d4e5f3;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: row;
}

#body-content {
  background-color: #193a6a;
}
</style>
