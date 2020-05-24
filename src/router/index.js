import Vue from 'vue'
import Router from 'vue-router'
import LinkList from '../components/LinkList'
import AppLogin from '../components/AppLogin'
import Chaines from '../components/Chaines'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Chaines
    },
    {
      path: '/emissions',
      name: 'emissions',
      component: LinkList,
      props: true
    },
    {
      path: '/login',
      component: AppLogin
    }
  ],
  mode: 'history'
})
