<template>
  <div class="popup" v-show="modelValue">
    <h3>Input employee details here:</h3>
    <form @submit.prevent="submitForm" class="employee-form">
      <div class="form-group">
        <label for="name" id="name">Name:</label>
        <input id="name" type="text" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="fullTime">Full-Time:</label>
        <input id="fullTime" type="text" v-model="fullTime" required />
      </div>
      <button class="close-popup">OK</button>
    </form>
  </div>
</template>

<script>
import app from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { addDoc, collection } from 'firebase/firestore';

export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      name: '',
      fullTime: ''
    };
  },
  methods: {
    async createEmployee(name, fullTime) {
      const db = getFirestore(app);

      const docRef = await addDoc(collection(db, 'employees'), {
        name: name,
        fullTime: fullTime
      });
      console.log('Document written with ID: ', docRef.id);
    },
    submitForm() {
      this.createEmployee(this.name, this.fullTime);
      this.$emit('update:modelValue', false); //  closes the popup after submitting the form
    }
  }
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
.employee-form {
  display: grid;
  gap: 15px;
  flex-direction: column;
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