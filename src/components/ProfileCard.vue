<template>
  <div class="card">
    <div class="card-body">
      <img
        class="card-profile-img"
        src="https://therichpost.com/wp-content/uploads/2021/03/avatar2.png"
        alt="Profile Picture"
      />
      <h3>Caleb Low</h3>
      <button>Information</button>
      <button>Appointments</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background-color: #fff;
  background-clip: border-box;
  border: none;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  border-radius: 1rem;
}

.card-profile-img {
  position: relative;
  max-width: 15rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  border: 3px solid #fff;
  border-radius: 100%;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  z-index: 2;
}

.card-body {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background-color: #fff;
  background-clip: border-box;
  border: none;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  border-radius: 1rem;
}
</style>
