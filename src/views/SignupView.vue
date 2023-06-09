<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import app from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';

const db = getFirestore(app);
const storage = getStorage(app);

export default {
  setup() {
    const name = ref('');
    const phone = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const errorMsg = ref(null);

    const store = useStore();
    const router = useRouter();

    const goBack = () => {
      router.push('/');
    };

    const goLogin = () => {
      router.push('/login');
    };

    const checkPassword = () => {
      if (password.value != confirmPassword.value) {
        errorMsg.value = "Passwords don't match";
      } else if (!/^\d+$/.test(phone.value)) {
        errorMsg.value = 'Please enter a valid phone number';
      } else {
        handleSubmit();
      }
    };

    // handles the submit in signup page
    const handleSubmit = async () => {
      try {
        await store.dispatch('signUp', {
          email: email.value.toLowerCase(),
          password: password.value,
          displayName: name.value,
          phoneNumber: phone.value
        });
        // adds user to customer, with appropriate site privileges
        await setDoc(doc(db, 'users', email.value.toLowerCase()), {
          user_name: name.value,
          user_email: email.value.toLowerCase(),
          user_phone: phone.value,
          isAdmin: false,
          isEmployee: false,
          isOwner: false
        });

        var file = document.getElementById('profilepic').files[0];
        if (file === undefined) {
          console.log('no file');
        } else {
          console.log('file');
          await uploadBytes(storageRef(storage, email.value.toLowerCase() + '.png'), file);
        }

        await store.dispatch('logIn', {
          email: email.value,
          password: password.value
        });
        const docRef = doc(db, 'users', email.value);

        const docSnap = await getDoc(docRef);

        // pushes user to appropriate site
        if (docSnap.exists()) {
          if (docSnap.data().isAdmin == true) {
            if (docSnap.data().isOwner == true) {
              router.push('/admin/scheduler');
            } else if (docSnap.data().isEmployee == true) {
              router.push('/employee/schedulerEmployee');
            }
          } else {
            router.push('/');
          }
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }

        router.push('/');
      } catch (error) {
        console.log(error.code);

        switch (error.code) {
          case 'auth/invalid-email':
            errorMsg.value = 'Invalid Email';
            break;
          case 'auth/email-already-in-use':
            errorMsg.value = 'Email is already in use';
            break;
          case 'auth/weak-password':
            errorMsg.value = 'Please choose a stronger password';
            break;
          case 'auth/missing-email':
            errorMsg.value = 'Please enter a email';
            break;
          case 'auth/missing-password':
            errorMsg.value = 'Please enter a password';
            break;
          default:
            errorMsg.value = 'Error Occured. Please try again later';
            break;
        }
      } finally {
        name.value = '';
        phone.value = '';
        email.value = '';
        password.value = '';
        confirmPassword.value = '';
      }
    };

    return {
      goBack,
      goLogin,
      checkPassword,
      handleSubmit,
      name,
      phone,
      email,
      password,
      confirmPassword,
      errorMsg
    };
  }
};
</script>

<template>
  <div class="main">
    <div class="login-container">
      <img
        alt="Back"
        class="backButton"
        src="@/assets/back-button.png"
        width="30"
        height="30"
        @click="goBack()"
      />
      <div class="sub-container">
        <h1>Create your Account</h1>
        <input class="input" type="text" placeholder="Name" v-model="name" required />
        <input type="file" id="profilepic" required />
        <input class="input" type="email" placeholder="Email" v-model="email" required />
        <input type="password" placeholder="Password" v-model="password" required />
        <input type="password" placeholder="Confirm Password" v-model="confirmPassword" required />
        <input class="input" type="phone" placeholder="Phone Number" v-model="phone" required />
      </div>
      <div class="sub-container">
        <button type="submit" class="submit" @click="checkPassword()">Register</button>
        <h4 v-if="errorMsg" class="errorMsg">{{ errorMsg }}</h4>
        <p class="login">
          Already have an account? <span class="loginButton" @click="goLogin()">Login</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  min-width: 840px;
  min-height: 780px;
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/signupBg.png');
  background-color: rgb(215, 229, 243);
  background-repeat: no-repeat;
  background-position: left;
  background-size: cover;
}

.login-container {
  flex-wrap: wrap;
  display: flex;
  border-style: solid;
  border-width: 0.1em;
  height: 90%;
  width: 40vw;
  justify-content: space-around;
  flex-direction: column;
}

.backButton {
  display: flex;
  margin: 0em 0em 1em 1em;
}

.backButton:hover {
  background: rgb(190, 210, 230);
  border-radius: 1em;
}

.sub-container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.sub-container:first-of-type {
  padding-top: 4em;
}

.sub-container:last-of-type {
  padding-bottom: 1em;
}

input {
  background-color: #193a6a;
  color: white;
  font-weight: bold;
  border: 0.1em;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  transition: 0.3s box-shadow;
  padding: 1em;
  margin: 0.5em;
  padding-left: 5em;
}

input[type='text'] {
  background-image: url('../assets/user.png');
  background-size: 2.3em;
  background-position: 15px 4px;
  background-repeat: no-repeat;
}

input[type='email'] {
  background-image: url('../assets/mail.png');
  background-size: 3em;
  background-position: 10px 0px;
  background-repeat: no-repeat;
}

input[type='password'] {
  background-image: url('../assets/key.png');
  background-size: 2.5em;
  background-position: 12px 4px;
  background-repeat: no-repeat;
}

input[type='phone'] {
  background-image: url('../assets/phone.png');
  background-size: 2.5em;
  background-position: 12px 4px;
  background-repeat: no-repeat;
}

input[type='file'] {
  background-image: url('../assets/upload.png');
  background-size: 2.5em;
  background-position: 15px 4px;
  background-repeat: no-repeat;
}

input:hover {
  box-shadow: 0 0 4px rgba(0, 0, 0, 1);
}

input:focus {
  background-color: #123456;
}

::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: antiquewhite;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: white;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: white;
}

.submit {
  background-color: white;
  color: #193a6a;
  font-weight: bold;
  border: 0.1em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: 0.3s box-shadow;
  padding: 1em;
  margin: 1em 2em;
}

.submit:hover {
  background-color: whitesmoke;
}

.submit:hover:disabled {
  background-color: none;
}

.sub-container h1 {
  padding-top: 1em;
  padding-left: 0.5em;
  font-weight: bold;
}

.errorMsg {
  text-align: center;
  color: red;
}

.login {
  text-align: end;
  padding-right: 2em;
}

.loginButton {
  color: #193a6a;
}

.loginButton:hover {
  text-decoration: underline;
  cursor: pointer;
}

@media (max-width: 840px) {
  .main {
    min-width: 400px;
    min-height: 780px;
    display: flex;
    background-color: rgb(215, 229, 243);
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
    background-image: none;
  }
  .login-container {
    flex-wrap: nowrap;
    display: flex;
    border-style: solid;
    border-width: 0.1em;
    height: 85%;
    margin-inline: 30vw;
    width: 336px;
    justify-content: space-around;
    flex-direction: column;
  }
}
</style>
