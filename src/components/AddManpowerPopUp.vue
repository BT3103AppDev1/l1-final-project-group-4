<script>
import app from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

const storage = getStorage(app);

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
      fullTime: false,
      phoneNum: '',
      email: '',
      password: '',
      leaveAllowance: 14,
      errorMsg: ''
    };
  },
  methods: {
    async createEmployee(name, fullTime, phoneNum, email, password, leaveAllowance, errorMsg) {
      const db = getFirestore(app);
      let fullTimeStatus = fullTime ? 'Full-Time' : 'Part-Time';

      try {
        // Dispatch an action to sign up an employee with email and password
        await this.$store.dispatch('signUpForEmployee', {
          email: email.toLowerCase(),
          password: password
        });

        // Set employee data to Firestore collection 'users'
        await setDoc(doc(db, 'users', email.toLowerCase()), {
          user_name: name,
          user_email: email.toLowerCase(),
          user_phone: phoneNum,
          isAdmin: true,
          isEmployee: true,
          isOwner: false
        });
        console.log('account saved to firebase');
      } catch (error) {
        console.log(error.code);
        switch (error.code) {
          // Handle authentication error cases
          case 'auth/invalid-email':
            errorMsg = 'Invalid Email';
            break;
          case 'auth/email-already-in-use':
            errorMsg = 'Email is already in use';
            break;
          case 'auth/weak-password':
            errorMsg = 'Please choose a stronger password';
            break;
          default:
            errorMsg = 'Error Occured. Please try again later';
            break;
        }
      }

      // Save employee data to Firestore collection 'employees'
      const docRef = await addDoc(collection(db, 'employees'), {
        name: name,
        fullTime: fullTimeStatus,
        phoneNum: phoneNum,
        email: email
      });

      // Save employee image to Firebase Storage
      var file = document.getElementById('employeepic').files[0];
      await uploadBytes(ref(storage, 'employee-' + name + '.png'), file);

      // Save leave info data to Firestore document 'schedule/leaves/{name}/info'
      const leaveRef = await setDoc(doc(db, 'schedule', 'leaves', name, 'info'), {
        allowance: leaveAllowance,
        prevLeaveBalance: leaveAllowance
      });
      console.log('Leave Document Written');
    },
    async submitForm() {
      await this.createEmployee(
        this.name,
        this.fullTime,
        this.phoneNum,
        this.email,
        this.password,
        this.leaveAllowance,
        this.errorMsg
      );
      this.$emit('update:modelValue', false); // Close the popup after submitting the form
    },
    closeForm() {
      this.$emit('update:modelValue', false); // Close the popup after submitting the form
    }
  }
};
</script>

<template>
  <div class="popup" v-show="modelValue">
    <h3>Input employee details here:</h3>
    <button class="bwt-close" @click="closeForm">x</button>
    <form @submit.prevent="submitForm" class="employee-form">
      <!-- input name -->
      <div class="form-group">
        <label for="name" id="name">Name:</label>
        <input id="name" type="text" v-model="name" required />
      </div>
      <!-- input employment status -->
      <div class="form-group">
        <label for="fullTime">Full-Time:</label>
        <input id="fullTime" type="checkbox" value="Full-Time" v-model="fullTime" />
      </div>
      <!-- input phone number -->
      <div class="form-group">
        <label for="phoneNum">Phone:</label>
        <input id="phoneNum" type="tel" v-model="phoneNum" pattern="[0-9]{8}" required />
      </div>
      <!-- input email -->
      <div class="form-group">
        <label for="email">Email:</label>
        <input id="email" type="email" v-model="email" required />
      </div>
      <!-- input password -->
      <div class="form-group">
        <label for="password">Password:</label>
        <input id="password" type="text" v-model="password" required />
      </div>
      <!-- input leave allowance -->
      <div class="form-group">
        <label for="leaveAllowance">Leave Allowance:</label>
        <input id="leaveAllowance" type="number" v-model="leaveAllowance" required />
      </div>
      <div class="form-group">
        <label for="employeepic">Upload Picture:</label>
        <input id="employeepic" type="file" required />
      </div>
      <p class="errorMsg">{{ errorMsg }}</p>
      <button class="close-popup">OK</button>
    </form>
  </div>
</template>

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

.errorMsg {
  text-align: center;
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
