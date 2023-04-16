<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import app from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const errorMsg = ref(null);

    const store = useStore();
    const router = useRouter();
    const db = getFirestore(app);

    const goBack = () => {
      router.push('/');
    };

    const goRegister = () => {
      router.push('/signup');
    };

    // function that handles the submit button in login
    const handleSubmit = async () => {
      try {
        await store.dispatch('logIn', {
          email: email.value,
          password: password.value
        });
        console.log('doc ref is customers/' + email.value);
        const docRef = doc(db, 'customers', email.value);
        console.log();
        const docSnap = await getDoc(docRef);

        // pushes user to the appropriate site
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
        // error is caught if cannot login
      } catch (error) {
        console.log(error.code);

        switch (error.code) {
          case 'auth/invalid-email':
            errorMsg.value = 'Invalid Email';
            break;
          case 'auth/user-not-found':
            errorMsg.value = 'No account with that email was found';
            break;
          case 'auth/wrong-password':
            errorMsg.value = 'Incorrect Password';
            break;
          default:
            errorMsg.value = 'Email or password was incorrect';
            break;
        }
      } finally {
        email.value = '';
        password.value = '';
      }
    };
    return { goBack, goRegister, handleSubmit, email, password, errorMsg };
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
        <h1>Login to your account</h1>
        <input class="input" type="email" placeholder="Email" v-model="email" required />
        <input type="password" placeholder="Password" v-model="password" required />
      </div>
      <div class="sub-container">
        <button type="submit" class="submit" @click="handleSubmit()">Log In</button>
        <h4 v-if="errorMsg" class="errorMsg">{{ errorMsg }}</h4>
        <p class="register">
          Do not have an account? <span class="registerButton" @click="goRegister()">Register</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  min-width: 840px;
  min-height: 680px;
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/loginBg.png');
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
  height: 70%;
  width: 40vw;
  justify-content: space-around;
  flex-direction: column;
}

.backButton {
  display: flex;
  margin: 0em 0em 0em 1em;
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
  margin: 1em;
  padding-left: 5em;
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
  background-position: 10px 4px;
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

.sub-container h1 {
  padding-top: 1em;
  padding-left: 0.5em;
  font-weight: bold;
}

.errorMsg {
  text-align: center;
  color: red;
}

.register {
  text-align: end;
  padding-right: 2em;
}

.registerButton {
  color: #193a6a;
}

.registerButton:hover {
  text-decoration: underline;
  cursor: pointer;
}

@media (max-width: 840px) {
  .main {
    min-width: 400px;
    min-height: 680px;
    display: flex;
    background-color: rgb(215, 229, 243);
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
    background-image: none;
  }
  .login-container {
    flex-wrap: wrap;
    display: flex;
    border-style: solid;
    border-width: 0.1em;
    height: 70%;
    margin-inline: 30vw;
    width: 336px;
    justify-content: space-around;
    flex-direction: column;
  }
}
</style>
