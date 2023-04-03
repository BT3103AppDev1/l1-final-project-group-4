<script>
import TheEmployeeHeader from '@/components/TheEmployeeHeader.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ManpowerProfileCard from '../../components/ManpowerProfileCard.vue';

export default {
  components: {
    TheEmployeeHeader,
    ManpowerProfileCard
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
      <div class="profile-info">
        <div class="profile-info-box">
          <ManpowerProfileCard />
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
  overflow: hidden;
}
.body {
  background-size: cover;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.profile-info-box {
  width: 95%;
  height: 80vh;
  background-color: #193a6a;
  border-radius: 20px;
  overflow: scroll;
  margin: auto;
}
.profile-info {
  display: flex;
  flex: 4;
}
</style>
