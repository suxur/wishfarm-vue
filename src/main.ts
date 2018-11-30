import Vue from 'vue'
import ElementUI from 'element-ui';
import Buefy from 'buefy'
import App from './App.vue'
import router from './router'
import store from './store'
import { db, auth } from './firebase'
import 'buefy/dist/buefy.css'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'


Vue.use(Buefy)
Vue.use(ElementUI, {locale})

Vue.prototype.$db = db
Vue.prototype.$auth = auth

Vue.config.productionTip = false

let app: Vue

auth.onAuthStateChanged(user => {
    if (!app) {
        app = new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app')
    }
})
