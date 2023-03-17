<script>
import { auth } from "../firebase.js"
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    goBack() {
      this.$router.push({path: "/"})
    },
    login() {
      console.log(this.email)
      signInWithEmailAndPassword(auth, this.email, this.password).then((data) => {
      console.log("Login Successful!");
      console.log(auth.currentUser);
      this.$router.push("/");
      }) 
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
        this.email = "";
        this.password = "";
      })  
    }
  }
}
</script>

<template>
  <div class="main">
    <div class="login-container">
      <img alt="Back" class="backButton" src="@/assets/back-button.png" width="30" height="30" @click="goBack"/>
      <div class="sub-container">
        <h1>Login to your account</h1>
      
        <input class="input" type="email" placeholder="Email" v-model="email" required>
        <input type="password" placeholder="Password" v-model="password" required>
      </div>
      <div class="sub-container">
        <button type="submit" class="submit" @click="login">Log In</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .main {
    min-width: 840px;
    min-height: 600px;
    display: flex;
    background-color: rgb(215, 229, 243);
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
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
    margin: 0.5em 0em 0em 0.5em;
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
    background-color: #193A6A;
    color: white;
    font-weight: bold;
    border: 0.1em;
    box-shadow:0 0 4px rgba(0,0,0,0.3);
    transition: .3s box-shadow;
    padding: 1em;
    margin: 1em;
    padding-left: 5em;
  }

  input[type = email] {
    background-image: url("../assets/mail.png");
    background-size: 3em;
    background-position: 10px 0px;
    background-repeat: no-repeat;
  }

  input[type = password] {
    background-image: url("../assets/key.png");
    background-size: 2.5em;
    background-position: 10px 4px;
    background-repeat: no-repeat;
  }

  input:hover {
    box-shadow:0 0 4px rgba(0,0,0,1);
  }

  input:focus {
    background-color: #123456;
  }

  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color:antiquewhite;
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: white;
  }

  ::-ms-input-placeholder { /* Microsoft Edge */
    color: white;
  }

  .submit {
    background-color: white;
    color: #193A6A;
    font-weight: bold;
    border: 0.1em;
    box-shadow:0 0 10px rgba(0,0,0,0.3);
    transition: .3s box-shadow;
    padding: 1em;
    margin: 1em 2em;
  }

  .sub-container h1 {
    padding-top: 1em;
    padding-left: 0.5em;
    font-weight: bold;
  }

  @media (max-width: 840px) {
    .main {
    min-width: 400px;
    min-height: 600px;
    display: flex;
    background-color: rgb(215, 229, 243);
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
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