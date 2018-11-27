import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource'

import App from './App.vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue'

import Storage from '../util/storage.js'

Vue.use(VueRouter)
Vue.use(ElementUi)
Vue.use(VueResource);
Vue.use(Storage)


Vue.http.options.root = 'http://localhost:8080';
Vue.http.options.emulateHTTP = true;

const routes = [
    { path: '/home', component: Home,name:"home" },
    { path: '/login', component: Login },
    { path: '/', component: Login }
]

const router = new VueRouter({
    routes
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')