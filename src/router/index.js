import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component:()=> import(/* webpackChunkName: "Login" */'@pages/Login/Login.vue'),
    },
    {
      path: '/MainPage',
      name: 'MainPage',
      component:()=> import(/* webpackChunkName: "Login" */'@pages/MainPage/MainPage.vue'),
    },
    {
      path: '/*',
      redirect: '/'
    }
  ]
})
