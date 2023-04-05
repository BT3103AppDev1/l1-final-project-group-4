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
      path: '/myappointments',
      name: 'myappointments',
      component: () => import('../views/MyAppointmentsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/groomingprogress',
      name: 'groomingprogress',
      component: () => import('../views/GroomingProgressView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/scheduler',
      name: 'scheduler',
      component: () => import('../views/admin/SchedulerView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true, isOwner: true}
    },
    {
      path: '/admin/scheduler/today',
      name: 'schedulertoday',
      component: () => import('../views/admin/SchedulerTodayView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true, isOwner: true }
    },
    {
      path: '/admin/manpower',
      name: 'manpower',
      component: () => import('../views/admin/ManpowerView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true, isOwner: true }
    },
    {
      path: '/admin/leave',
      name: 'leave',
      component: () => import('../views/admin/LeaveView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true, isOwner: true }
    },
    {
      path: '/employee/schedulerEmployee',
      name: 'schedulerEmployee',
      component: () => import('../views/employee/SchedulerEmployee.vue'),
      meta: { requiresAuth: true, requiresAdmin: true, isEmployee: true }
    },
    {
      path: '/employee/schedulerEmployee/today',
      name: 'schedulertodayEmployee',
      component: () => import('../views/employee/SchedulerTodayEmployee.vue'),
      meta: { requiresAuth: true, requiresAdmin: true, isEmployee: true }
    },
    {
      path: '/employee/manpowerEmployee',
      name: 'manpowerEmployee',
      component: () => import('../views/employee/ManpowerEmployee.vue'),
      meta: { requiresAuth: true, requiresAdmin: true, isEmployee: true }
    },
    {
      path: '/employee/leaveEmployee',
      name: 'leaveEmployee',
      component: () => import('../views/employee/LeaveEmployee.vue'),
      meta: { requiresAuth: true, requiresAdmin: true, isEmployee: true }
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
  let isAdmin = store.state.isAdmin
  if (to.meta.requiresAdmin && !isAdmin) {
    return {
      path: '/',
      query: { redirect: to.fullPath}
    }
  }
  let isEmployee = store.state.isEmployee
  if (to.meta.isEmployee && !isEmployee) {
    return {
      path: '/admin/scheduler',
      query: { redirect: to.fullPath}
    }
  } 
  let isOwner = store.state.isOwner
  if (to.meta.isOwner && !isOwner) {
    return {
      path: '/employee/schedulerEmployee',
      query: { redirect: to.fullPath}
    }
  }
})

export default router
