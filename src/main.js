import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './plugins/router'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebookSquare, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faTimes, faSearch, faTimesCircle, faCheckCircle, faEdit, faTrash, faExclamationCircle, faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import { initFacebookSdk} from './helpers/initFacebookSDK'

library.add(faFacebookSquare, faGoogle, faTimes, faSearch, faTimesCircle, faCheckCircle, faEdit, faTrash, faExclamationCircle, faStar, farStar)
Vue.component('font-awesome', FontAwesomeIcon)

Vue.config.productionTip = false

startApp()
initFacebookSdk()

function startApp()
{
  new Vue({
    vuetify,
    router,
    render: h => h(App)
  }).$mount('#app')
}