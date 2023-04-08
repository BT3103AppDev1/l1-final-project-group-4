<script>
import TheEmployeeHeader from '@/components/TheEmployeeHeader.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ManpowerInfo from '../../components/ManpowerInfo.vue';

export default {
  components: {
    TheEmployeeHeader,
    ManpowerInfo
  },
  setup() {
    const errorMsg = ref(null);
    const store = useStore();
    const router = useRouter();
  }
};
</script>

<template>
  <div class="main">
    <TheEmployeeHeader />
    <div class="body">
      <!-- <div class="profile-info-box"> -->
      <ManpowerInfo />
      <!-- </div> -->
    </div>
  </div>
</template>

<style scoped>
.main {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.body {
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
  margin: auto;
}
</style>
