import Vue from 'vue'
import Router from 'vue-router'
// import MainPage:AsyncComponent =():any=> import('@/components/MainPage.vue')
// import Login :AsyncComponent =():any=> import( '@/components/Login.vue')
import MainPage from '@pages/MainPage.vue'
import Login from '@pages/LoginMain.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/MainPage',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/*',
      redirect: '/'
    }
  ]
})
