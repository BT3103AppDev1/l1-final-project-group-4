<script>
import TheAdminHeader from '@/components/TheAdminHeader.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ManpowerProfileCard from '../../components/ManpowerProfileCard.vue';

export default {
  components: {
    TheAdminHeader,
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
    return { handleSubmit, TheAdminHeader, ManpowerProfileCard };
  }
};
</script>

<template>
  <div class="main-manpower">
    <TheAdminHeader />
    <div class="body-manpower">
      <div class="profile-info-manpower">
        <div class="profile-info-box-manpower">
          <ManpowerProfileCard />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-manpower {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.body-manpower {
  background-size: cover;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.profile-info-box-manpower {
  width: 95%;
  height: 80vh;
  background-color: #193a6a;
  border-radius: 20px;
  overflow: scroll;
  margin: auto;
  margin-top: 30px;
}
.profile-info-manpower {
  display: flex;
  flex: 4;
}
</style>
