import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Login from './components/Login.vue'

Vue.use(VueRouter)
Vue.use(ElementUi)

const routes = [
    { path: '/login', component: Login }
]

const router = new VueRouter({
    routes
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')