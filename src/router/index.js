import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import UnAuthorisedView from '../views/UnAuthorisedView.vue'
import LoginView from '@/views/LoginView.vue'
import AuthorisedView from '@/views/AuthorisedView.vue'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FireBaseRegisterView from '@/views/FireBaseRegisterView.vue'
import FirebaseSignoutView from '@/views/FirebaseSignoutView.vue'
import FirebaseAddBookView from '@/views/AddBookView.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'
import WeatherView from '@/views/WeatherView.vue'
import CountBookAPI from '@/views/CountBookAPI.vue'
import GetAllBookAPI from '@/views/GetAllBookAPI.vue'

let userAccess = false

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },

  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/authorisedView',
    name: 'AuthorisedView',
    component: AuthorisedView
  },
  {
    path: '/unAuthorisedView',
    name: 'UnAuthorisedView',
    component: UnAuthorisedView
  },
  {
    path: '/Fireregister',
    name: 'Fireregister',
    component: FireBaseRegisterView
  },
  {
    path: '/Firelogin',
    name: 'Firelogin',
    component: FirebaseSigninView
  },
  {
    path: '/Firesignout',
    name: 'Firesignout',
    component: FirebaseSignoutView
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: FirebaseAddBookView,
  },
  {
    path:'/GetBookCount',
    name:'GetBookCount',
    component: GetBookCountView
  },
  {
    path:'/WeatherCheck',
    name:'WeatherCheck',
    component: WeatherView
  },
  {
    path:'/CountBookAPI',
    name:'CountBookAPI',
    component: CountBookAPI
  },
  {
    path:'/GetAllBookAPI',
    name:'GetAllBookAPI',
    component: GetAllBookAPI,
  },
  
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export function setUserAccess(value) {
  userAccess = value
}

router.beforeEach((to, from, next) => {
  if (to.name === 'About' && !userAccess) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export { userAccess }
export default router
