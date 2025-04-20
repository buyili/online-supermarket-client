import Vue from 'vue'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource'

import App from './App.vue'

import router from './router.js'
import Storage from '../util/storage.js'
import PluginWrapElementUI from '../util/pluginWrapElementUI.js'
import config from '../constant/config.js'


Vue.use(ElementUi)
Vue.use(VueResource);
Vue.use(Storage)
Vue.use(PluginWrapElementUI)

// 开发环境
Vue.http.options.root = config.devServerRootUrl;
// 生产环境
//Vue.http.options.root = 'http://www.qqbuyi.club/online-supermarket-server';
Vue.http.options.emulateHTTP = true;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')