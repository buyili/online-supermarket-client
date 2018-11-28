import Vue from 'vue'
import { message } from '../../util/pluginWrapElementUI.js'

export function login(payload, success, error) {
    Vue.http.post("admin/login", payload).then(({body})=>{
        success(body)
    }, error);
}

export function logout(cb){
    localStorage.removeItem('token');
    message.success("登出成功")
    cb();
}