<script setup>
  //need to pull from database the pet name, avai date and time!!
  import TheHeader from '@/components/TheHeader.vue'
  import AppointmentPopUp from '@/components/AppointmentPopUp.vue';
  import { ref, defineExpose } from 'vue'
  const selectedOptionPet = ref('Select Pet') 
  const selectedOptionService = ref('Select Service')
  const selectedOptionDate = ref('Select Date')
  const selectedOptionTime = ref('Select Time')

  const isServiceMenuOpen = ref(false)
  const isPetMenuOpen = ref(false)
  const isDateMenuOpen = ref(false)
  const isTimeMenuOpen = ref(false)


  // Method to handle click outside event
  function handleClickOutsidePet(event) {
    const petMenu = document.querySelector('.dropdown.toggle')
    if (
      isPetMenuOpen.value &&
      petMenu && !petMenu.contains(event.target)
    ) {
      isPetMenuOpen.value = false
    }
  
  }

  function handleClickOutsideService(event) {
    const serviceMenu = document.querySelector('#services')
    if (
      isServiceMenuOpen.value &&
      serviceMenu && !serviceMenu.contains(event.target)
    ) {
      isServiceMenuOpen.value = false
    }
  }

  function handleClickOutsideDate(event) {
    const dateMenu = document.querySelector('#date')
    if (
      isDateMenuOpen.value &&
      dateMenu && !dateMenu.contains(event.target)
    ) {
      isDateMenuOpen.value = false
    }
  }

  function handleClickOutsideTime(event) {
    const timeMenu = document.querySelector('#time')
    if (
      isTimeMenuOpen.value &&
      timeMenu && !timeMenu.contains(event.target)
    ) {
      isTimeMenuOpen.value = false
    }
  }

  // Attach click event listener to document
  document.addEventListener('click', handleClickOutsideService)
  document.addEventListener('click', handleClickOutsidePet)
  document.addEventListener('click', handleClickOutsideDate)
  document.addEventListener('click', handleClickOutsideTime)

  let show = ref(false);

  function showPopUp() {
      show.value = true
  }

  defineExpose({
    show,
    showPopUp,
  });


  
</script>

<template>
  <TheHeader /> 

  <div class="main">
    
    <form class="form-container">   
      <div class = "sched-appt"> Schedule your appointment now! </div>
      
      <div class = "select-pet">Select Pet</div>
        <div class="dropdown toggle">
        <input id="t1" type="checkbox" checked v-model="isPetMenuOpen">
        <label for="t1" id = "dropdownlabel1" v-text="selectedOptionPet"></label>
 
        <ul v-show="isPetMenuOpen">
          <li><a href="#" @click.stop="selectedOptionPet = 'Item'; isPetMenuOpen = false;">Item</a></li>
          <li><a href="#" @click.stop="selectedOptionPet = 'Product'; isPetMenuOpen = false;">Product</a></li>
          <li><a href="#" @click.stop="selectedOptionPet = 'Text'; isPetMenuOpen = false;">Text</a></li>
        </ul>
      </div>

      <br>

      <div class = "select-service">Select Service</div>
        <div class="dropdown toggle" id = "services">
        <input id="t2" type="checkbox" checked v-model="isServiceMenuOpen">
        <label for="t2" id = "dropdownlabel2" v-text="selectedOptionService"></label>
 
        <ul v-show="isServiceMenuOpen">
          <li><a href="#" @click.stop ="selectedOptionService = 'Basic Grooming'; isServiceMenuOpen = false;">Basic Grooming</a></li>
          <li><a href="#" @click.stop ="selectedOptionService = 'Full Grooming'; isServiceMenuOpen = false;">Full Grooming</a></li>
          <li><a href="#" @click.stop ="selectedOptionService = 'Teeth Cleaning'; isServiceMenuOpen = false;">Teeth Cleaning</a></li>
          <li><a href="#" @click.stop ="selectedOptionService = 'Spa Treatment'; isServiceMenuOpen = false;">Spa Treatment</a></li>
        </ul>
      </div>

      <br>

      <div class = "select-date">Select Date</div>
        <div class="dropdown toggle" id = "date">
        <input id="t3" type="checkbox" checked v-model="isDateMenuOpen">
        <label for="t3" id = "dropdownlabel3" v-text="selectedOptionDate"></label>
 
        <ul v-show="isDateMenuOpen" id = "dropdown-menu">
          <li><a href="#" @click.stop ="selectedOptionDate = 'd1'; isDateMenuOpen = false;">d1</a></li>
          <li><a href="#" @click.stop ="selectedOptionDate = 'd2'; isDateMenuOpen = false;">d2</a></li>
          <li><a href="#" @click.stop ="selectedOptionDate = 'd3'; isDateMenuOpen = false;">d3</a></li>
          <li><a href="#" @click.stop ="selectedOptionDate = 'd4'; isDateMenuOpen = false;">d4</a></li>
          <li><a href="#" @click.stop ="selectedOptionDate = 'd5'; isDateMenuOpen = false;">d5</a></li>
          <li><a href="#" @click.stop ="selectedOptionDate = 'd6'; isDateMenuOpen = false;">d6</a></li>
        </ul>
      </div>

      <br>

      <div class = "select-time">Select Time</div>
        <div class="dropdown toggle" id = "time">
        <input id="t4" type="checkbox" checked v-model="isTimeMenuOpen">
        <label for="t4" id = "dropdownlabel4" v-text="selectedOptionTime"></label>
 
        <ul v-show="isTimeMenuOpen">
          <li><a href="#" @click.stop ="selectedOptionTime = 't1'; isTimeMenuOpen = false;">t1</a></li>
          <li><a href="#" @click.stop ="selectedOptionTime = 't2'; isTimeMenuOpen = false;">t2</a></li>
          <li><a href="#" @click.stop ="selectedOptionTime = 't3'; isTimeMenuOpen = false;">t3</a></li>
          <li><a href="#" @click.stop ="selectedOptionTime = 't4'; isTimeMenuOpen = false;">t4</a></li>
        </ul>
      </div>

      <br>
      <br>
      
      <button id = "submit-button" type = "button" v-on:click = showPopUp>Submit</button>
  
    </form>

    <div class ="appt-img"> 
      <img id = "dogs" src = "@/assets/appts-img.png">
    </div>
  </div>

  <AppointmentPopUp v-model="show"> 
  </AppointmentPopUp>


</template>

<style scoped>
.main {
  min-width: 1000px;
  min-height: 600px;
  display: flex;
  background-color: rgb(215, 229, 243);
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;

  }

.sched-appt {
  font-weight: bold;
  font-size: 40px;;
  padding-bottom: 20px;
}

#submit-button {
  background-color: #2c5b94; 
  color:#FFF;
  border : none;
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border-radius: 0.5em;;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 400px;
}

#dropdown-menu {
    max-height: 200px;
    overflow-y: scroll;
    position: absolute;
    width: 100%;
    color: black;
    box-shadow: 0 6px 5px -5px rgba(0,0,0,0.3);
    z-index: 1;
  }

.select-service, .select-pet, .select-date, .select-time, .select-location{
  font-weight: bold;
}

#dogs {
  height: 450px;
}

.dropdown {
  width: 300px;
}
.dropdown.toggle > input {
  display: none;
}

.dropdown > a, .dropdown.toggle > label {
  border-radius: 2px;
  box-shadow: 0 6px 5px -5px rgba(0,0,0,0.3);
}

.dropdown > a::after, .dropdown.toggle > label::after {
  content: "";
  float: right;
  margin: 15px 15px 0 0;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 10px solid #CCC;
}
.dropdown ul {
  list-style-type: none;
  display: block;
  margin: 0;
  padding: 0;
  position: absolute;
  width: 100%;
  box-shadow: 0 6px 5px -5px rgba(0,0,0,0.3);
  overflow: hidden;
  z-index : 1;
}
.dropdown a, .dropdown.toggle > label {
  display: block;
  padding: 0 0 0 10px;
  text-decoration: none;
  line-height: 40px;
  font-size: 13px;
  text-transform: uppercase;
  font-weight: bold;
  color: #999;
  background-color: #FFF;
}
.dropdown li {
  height: 0;
  overflow: hidden;
  transition: all 500ms;
}

.dropdown.hover li {
  transition-delay: 300ms;
}

.dropdown a:hover, .dropdown.toggle > label:hover, .dropdown.toggle > input:checked ~ label {
  background-color: #EEE;
  color: #666;
}

.dropdown.toggle > input:checked ~ ul li {          
  height: 40px;
}

</style>
