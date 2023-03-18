import { createStore } from 'vuex'
import { auth } from '../firebase.js'
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut 
} from "firebase/auth";

const store = createStore({
    state: {
        user: null
    },
    // getters: {
    //     user(state){
    //     return state.user
    //     }
    // },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
            console.log("User state changed: ", state.user);
        },
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
                throw new Error("Could not complete login")
            }
        },
        async logOut(context) {
            console.log("Logging out")
            await signOut(auth)
            context.commit('setUser', null )
        }
    }
})

// export the store
export default store