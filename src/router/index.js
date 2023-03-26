import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../views/ServicesView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true}
    },
    {
      path: '/bookappointment',
      name: 'bookappointment',
      component: () => import('../views/BookAppointmentView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/groomingprogress',
      name: 'groomingprogress',
      component: () => import('../views/GroomingProgressView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/scheduler',
      name: 'scheduler',
      component: () => import('../views/admin/SchedulerView.vue')
    },
    {
      path: '/manpower',
      name: 'manpower',
      component: () => import('../views/admin/ManpowerView.vue')
    },
    {
      path: '/leave',
      name: 'leave',
      component: () => import('../views/admin/LeaveView.vue')
    }
  ]
})
router.beforeEach((to, from) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  let user = store.state.user
  if (to.meta.requiresAuth && !user) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: '/login',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    }
  }
})

export default router
