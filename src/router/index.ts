import Vue,{AsyncComponent} from 'vue'
import Router,{ RouteConfig, Route, NavigationGuard } from 'vue-router'
// import MainPage:AsyncComponent =():any=> import('@/components/MainPage.vue')
// import Login :AsyncComponent =():any=> import( '@/components/Login.vue')
import MainPage from '@/components/MainPage.vue'
import Login from '@/components/LoginMain.vue'
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
