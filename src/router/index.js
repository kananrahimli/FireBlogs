import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Blogs from '../views/Blogs.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import ResetPassword from '../views/ResetPassword.vue'
Vue.use(VueRouter);


const routes = [
  {
    path: '/',
    redirect:'/home',
  },
  
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      title:'Login'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta:{
      title:'Register'
    }
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
    meta:{
      title:'ResetPassword'
    }
  },
  
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{
      title:'Home'
    }
  },

  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs,
    meta:{
      title:'Blogs'
    }
  },{
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta:{
      title:'Profile'
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=> {
  document.title=`${to.meta.title} | FireBlogs`
  next()
})
  

export default router
