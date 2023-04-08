import { createStore } from 'vuex';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import createPersistedState from 'vuex-persistedstate';
import app from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';

const auth = getAuth(app);
const db = getFirestore(app);

const store = createStore({
  state: {
    user: null,
    authIsReady: false,
    userEmail: null,
    userName: null,
    userPhone: null,
    isAdmin: false,
    isEmployee: false,
    isOwner: false
  },
  plugins: [createPersistedState()],

  getters: {
    user(state) {
      return state.user;
    }
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
      console.log('User state changed: ', state.user);
    },
    setAuthIsReady(state, payload) {
      state.authIsReady = payload;
    },
    setUserEmail(state, payload) {
      state.userEmail = payload;
    },
    setUserName(state, payload) {
      state.userName = payload;
    },
    setUserPhone(state, payload) {
      state.userPhone = payload;
    },
    setIsAdmin(state, payload) {
      state.isAdmin = payload;
    },
    setIsEmployee(state, payload) {
      state.isEmployee = payload;
    },
    setIsOwner(state, payload) {
      state.isOwner = payload;
    }
  },
  actions: {
    async logIn(context, { email, password }) {
      const response = await signInWithEmailAndPassword(auth, email, password);
      // console.log(response)
      if (response) {
        context.commit('setUser', response.user);
        context.commit('setUserEmail', auth.currentUser.email);
        const docRef = doc(db, 'customers', auth.currentUser.email);
        const docSnap = await getDoc(docRef);
        let documentData = docSnap.data();
        let name = documentData.customer_name;
        let phone = documentData.customer_phone;
        let isAdmin = documentData.isAdmin;
        let isEmployee = documentData.isEmployee;
        let isOwner = documentData.isOwner;
        context.commit('setUserName', name);
        context.commit('setUserPhone', phone);
        context.commit('setIsAdmin', isAdmin);
        context.commit('setIsEmployee', isEmployee);
        context.commit('setIsOwner', isOwner);
      } else {
        throw new Error('login failed');
      }
    },
    async signUp(context, { email, password, name, phone }) {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      // console.log(response)
      if (response) {
        context.commit('setUser', response.user);
        context.commit('setUserEmail', auth.currentUser.email);
        context.commit('setUserName', name);
        context.commit('setUserPhone', phone);
        context.commit('setIsAdmin', false);
      } else {
        throw new Error('Could not complete login');
      }
    },
    async signUpForEmployee(context, { email, password }) {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      // console.log(response)
      if (response) {
        console.log(email, " account successfully created")
      } else {
        console.log("signup for employee failed")
        throw new Error('Could not complete login');
      }
    },
    async logOut(context) {
      console.log('Logging out');
      await signOut(auth);
      context.commit('setUser', null);
      context.commit('setUserEmail', null);
      context.commit('setUserName', null);
      context.commit('setUserPhone', null);
      context.commit('setIsAdmin', false);
    }
  }
});

const unsub = onAuthStateChanged(auth, (user) => {
  store.commit('setAuthIsReady', true);
  store.commit('setUser', user);
  unsub();
});
// export the store
export default store;
