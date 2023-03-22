import { createStore } from 'vuex'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import app from '../firebase.js'
const auth = getAuth(app)

const store = createStore({
  state: {
    user: null,
    authIsReady: false
  },

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
    }
  },
  actions: {
    async logIn(context, { email, password }) {
      const response = await signInWithEmailAndPassword(auth, email, password)
      // console.log(response)
      if (response) {
        context.commit('setUser', response.user)
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
    }
  }
})

const unsub = onAuthStateChanged(auth, (user) => {
  store.commit('setAuthIsReady', true)
  store.commit('setUser', user)
  unsub()
})
// export the store
export default store
