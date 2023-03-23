import { createStore } from 'vuex'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import createPersistedState from "vuex-persistedstate";
import app from '../firebase.js'
const auth = getAuth(app)

const store = createStore({
  state: {
    user: null,
    authIsReady: false,
    userEmail: null
  },
  plugins: [createPersistedState()],

  getters: {
    user(state) {
      return state.user
    }
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload
      console.log('User state changed: ', state.user)
    },
    setAuthIsReady(state, payload) {
      state.authIsReady = payload
    },
    setUserEmail(state, payload) {
        state.userEmail = payload
    }
  },
  actions: {
    async logIn(context, { email, password }) {
      const response = await signInWithEmailAndPassword(auth, email, password)
      // console.log(response)
      if (response) {
        context.commit('setUser', response.user)
        context.commit('setUserEmail', auth.currentUser.email)
      } else {
        throw new Error('login failed')
      }
    },
    async signUp(context, { email, password }) {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      // console.log(response)
      if (response) {
        context.commit('setUser', response.user)
      } else {
        throw new Error('Could not complete login')
      }
    },
    async logOut(context) {
      console.log('Logging out')
      await signOut(auth)
      context.commit('setUser', null)
      context.commit('setUserEmail', null)
    }
  }
})

const unsub = onAuthStateChanged(auth, (user) => {
  store.commit('setAuthIsReady', true)
  store.commit('setUser', user)
//   store.commit('setUserEmail', auth.currentUser.email)
  unsub()
})
// export the store
export default store
