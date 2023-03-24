<script>
//need to grab personal details from database! XD
</script>

<template>
    <div class = "personal-info" > 
        <h1> Profile </h1>
        <div class="my-details">
            <h3> Name: {{ name }} </h3> 
            <h3> Gender: {{ gender }} </h3>
            <h3> Email: {{ email }} </h3>
            <h3> Contact Number: {{ contactno }} </h3>
        </div>
        
        
       
    </div>
    
</template>

<style scoped>

.personal-info {
    padding-left: 20px;
}
h1 {
    text-decoration: underline;
}
h1, h3 {
    margin-bottom: 10px;
    color:white;
    font-weight: bold;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}



</style>