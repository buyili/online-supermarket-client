
import Vue from 'vue'
import VueRouter from 'vue-router'

//Components
import Login from './components/Login.vue'
import Home from './components/Home.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/home', component: Home,name:"home" },
    { path: '/login', component: Login },
    { path: '/', component: Login }
]

const router = new VueRouter({
    routes
})

export default router;