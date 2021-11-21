import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebookSquare, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faTimes, faSearch, faTimesCircle, faCheckCircle, faEdit, faTrash, faExclamationCircle, faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'

library.add(faFacebookSquare, faGoogle, faTimes, faSearch, faTimesCircle, faCheckCircle, faEdit, faTrash, faExclamationCircle, faStar, farStar)
Vue.component('font-awesome', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
