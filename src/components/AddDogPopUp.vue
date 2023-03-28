<template>
  <div class="popup" v-show="modelValue">
    <h3>Input your dog's details here: </h3>
    <form @submit.prevent="submitForm" class="dog-form">
      <div class="form-group">
        <label for="dogName" id = "dogName">Name:</label>
        <input id="dogName" type="text" v-model="dogName" required />
      </div>
      <div class="form-group">
        <label for="dob">Date of Birth:</label>
        <input id="dob" type="date" v-model="dob" required />
      </div>
      <div class="form-group">
        <label for="breed" id = "dogBreed">Breed:</label>
        <input id="breed" type="text" v-model="breed" required />
      </div>
      <button class="close-popup" @click="$emit('update:modelValue', false)">OK</button>
    </form>
    
  </div>
</template>

<script>
import app from '../firebase.js'
import { getFirestore } from 'firebase/firestore'
import { addDoc, collection } from 'firebase/firestore'
import { useStore } from 'vuex'

export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dogName: "",
      dob: "",
      breed: ""
    };
  },
  setup() {
    const store = useStore()
    return { userEmail: store.state.userEmail }
  },
  methods: {
    async createDoggo(name, breed, dob) {
      const db = getFirestore(app)
      const email = this.userEmail

      const docRef = await addDoc(collection(db, "customers", email, "dogs"), {
        dog_name: name,
        dog_breed: breed,
        dog_dob: dob,
        dog_sex: "F"
      });
      console.log("Document written with ID: ", docRef.id);
    },
    submitForm() {
      this.createDoggo(this.dogName, this.breed, this.dob);

      
      this.$emit("update:modelValue", false); // this just closes the popup after submitting the form
    },
  },
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1000;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  padding: 30px 50px;
  transform: translate(-50%, -50%);
  text-align: center;
 
}

.close-popup {
  margin-top: 10px;
  cursor: pointer;
  background-color: #2c5b94;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
}
.dog-form {
  display: grid;
  gap: 15px;
  flex-direction:column
}

.form-group {
  display: flex;
  align-items: center;
  
}

label {
  flex-basis: 100px;
  flex-shrink: 0;
  margin-right: 10px;
}

input {
  flex-grow: 1;
}

button {
  align-self: flex-end;
}

</style>