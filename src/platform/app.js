import Vue from 'vue'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource'

import App from './App.vue'

import router from './router.js'
import Storage from '../util/storage.js'
import PluginWrapElementUI from '../util/pluginWrapElementUI.js'


Vue.use(ElementUi)
Vue.use(VueResource);
Vue.use(Storage)
Vue.use(PluginWrapElementUI)


Vue.http.options.root = 'http://localhost:8080';
Vue.http.options.emulateHTTP = true;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')