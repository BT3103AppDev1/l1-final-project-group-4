<script>

//just need to pull owners profile photo from database

</script>

<template>
  <div class="card">
    <div class="card-body">
        <img class="card-profile-img" src="@/assets/appts-img.png"/>
        <br>
        <br>
        <button id= "info-page">Information</button>
        
        <br>
      <router-link  to="/groomingprogress">
        <button id = "progress-page"> Dog Progress</button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>

.card-body {
    display:flex;
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

#info-page, #progress-page {
    background-color: #2c5b94;
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* change font */
    font-size: 1em;
    font-weight: bold;
    padding: 0.7em 1.2em;
    border-radius: 15px;
    border:none;
    width: 200px;
    display:flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.4);
    transition: opacity 0.2s ease-in-out;
  
}

#info-page:hover, #progress-page:hover {
  opacity: 0.9
}

</style>
