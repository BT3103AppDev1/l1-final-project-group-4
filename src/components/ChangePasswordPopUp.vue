<template>
  <div class="popup" v-show="modelValue">
    <h3>Change Password here:</h3>
    <button class="bwt-close" @click="closeForm">x</button>
    <form @submit.prevent="submitForm" class="employee-form">
      <div class="form-group">
        <label for="password" id="password">Password:</label>
        <input id="password" type="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password:</label>
        <input id="confirmPassword" type="password" v-model="confirmPassword" required />
      </div>
      <p id="error">{{ this.errorMsg }}</p>
      <button class="close-popup">OK</button>
    </form>
  </div>
</template>

<script>
import app from '../firebase.js';
import { getAuth, updatePassword } from 'firebase/auth';

export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      password: '',
      confirmPassword: '',
      errorMsg: ''
    };
  },
  methods: {
    async updatePassword(newPassword) {
      const auth = getAuth(app);
      const user = auth.currentUser;

      updatePassword(user, newPassword)
        .then(() => {
          this.errorMsg = 'Change Successful';
          this.password = '';
          this.confirmPassword = '';
        })
        .catch((error) => {
          console.log(error);
          switch (error.code) {
            case 'auth/requires-recent-login':
              this.errorMsg = 'Please logout and login again to change password';
              break;
            default:
              this.errorMsg = 'Error Occured. Please try again later';
              break;
          }
        });
    },
    submitForm() {
      if (this.password == this.confirmPassword) {
        this.updatePassword(this.password);
      } else {
        this.errorMsg = "Passwords don't match";
      }
    },
    closeForm() {
      this.password = '';
      this.confirmPassword = '';
      this.errorMsg = '';
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
.employee-form {
  display: grid;
  gap: 15px;
  flex-direction: column;
}

.form-group {
  display: flex;
  align-items: center;
}
#error {
  color: red;
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
