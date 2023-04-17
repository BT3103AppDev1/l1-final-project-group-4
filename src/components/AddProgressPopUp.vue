<template>
  <div class="popup" v-show="modelValue">
    <h3>Update dog's status here:</h3>
    <button class="bwt-close" @click="closeForm">x</button>
    <br />
    <form @submit.prevent="submitForm" class="dog-form">
      <div class="form-group">
        <label for="dogStatus">Status:</label>
        <select id="dogStatus" v-model="dogStatus" required>
          <option value="Bath">Bath</option>
          <option value="Groom">Groom</option>
          <option value="Cut">Cut</option>
        </select>
      </div>
      <div class="form-group">
        <label for="dogpic">Upload Picture:</label>
        <input id="dogpic" type="file" required />
      </div>

      <button class="close-popup" @click="submitForm">OK</button>
    </form>
  </div>
</template>

<script>
import app from '../firebase.js';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    apptID: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      dogStatus: '',
      dogpic: null
    };
  },
  methods: {
    async upload(apptID, dogStatus) {
      const storage = getStorage(app);
      var file = document.getElementById('dogpic').files[0];
      await uploadBytes(ref(storage, apptID + '-' + dogStatus + '.png'), file);
    },

    async submitForm() {
      await this.upload(this.apptID, this.dogStatus);
      this.$emit('update:modelValue', false); // this just closes the popup after submitting the form
    },
    closeForm() {
      this.$emit('update:modelValue', false); // this just closes the popup after submitting the form
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
.dog-form {
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

.bwt-close {
  position: absolute;
  right: -10px;
  top: -5px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background-color: red;
  color: white;
  font-size: 16px;
  font-weight: bold;
  font-size: 23px;
  text-align: center;
  cursor: pointer;
}
</style>
