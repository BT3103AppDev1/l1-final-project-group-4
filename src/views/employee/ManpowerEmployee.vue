<script>
import TheEmployeeHeader from '@/components/TheEmployeeHeader.vue';
import ManpowerInfo from '../../components/ManpowerInfo.vue';

export default {
  components: {
    TheEmployeeHeader,
    ManpowerInfo
  }
};
</script>

<template>
  <div class="main">
    <TheEmployeeHeader />
    <div class="body">
      <ManpowerInfo />
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
