import Vue from 'vue'
import VueRouter from "vue-router"
import Main from '../components/MainPage/Main.vue'
import SearchEngine from '../components/SearchEngine/SearchEngine.vue'
import Favorites from '../components/Favorites/Favorites.vue'
import CompanyManagment from '../components/CompanyManagment/CompanyManagment.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '',
      component: Main
    },
    {
      path: '/szukaj',
      component: SearchEngine
    },
    {
      path: '/ulubione',
      component: Favorites
    },
    {
      path: '/zarzadzanie',
      component: CompanyManagment
    }
  ],
  mode: 'history'
})