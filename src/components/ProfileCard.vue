<script>
//just need to pull owners profile photo from database
</script>

<template>
  <div class="card">
    <div class="card-body">
      <img class="card-profile-img" src="@/assets/appts-img.png" />
      <br />
    </div>
  </div>
</template>

<style scoped>
.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.card-profile-img {
  height: 200px;
  border-radius: 50%;
  margin-top: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
