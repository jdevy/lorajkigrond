import 'tachyons'
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import graphqlClient from './utils/graphql'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

import App from './App'
import router from './router'
import store from './store'
/* eslint-disable */
Vue.config.productionTip = false

Vue.use(VueApollo)

//const moment = require('moment')
require('moment/locale/fr')

Vue.use(VueMoment, {
  moment,
})

// Vue.use(require('vue-moment'), {
//     moment
// })


const apolloProvider = new VueApollo({
  defaultClient: graphqlClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  provide: apolloProvider.provide(),
  router,
  store,
  render: h => h(App)
})
