<script>
//need to grab dog image and dog details from database! XD
</script>

<template>
    <div class = "dog-info" > 
        <img class="card-profile-img" src="@/assets/appts-img.png"/>
        <div class="dog-details">
            <h3> Name: {{ dogName }} </h3> 
            <h3> Sex: {{ dogGender }} </h3>
            <h3> DOB: {{ dogDOB }} </h3>
            <h3> Breed: {{ dogBreed }} </h3>
        </div>
        
    </div>
    
</template>

<style scoped>

.dog-info {
    height: 93%;
    
}

.card-profile-img {
    height: 180px;
    padding-left: 30px;
    padding-top: 15px;
}
.dog-details {
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    padding-left: 20px;
   
}

h3 {
  margin-bottom: 10px; /* Customize this value to adjust the spacing */
  color: white;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}


</style>