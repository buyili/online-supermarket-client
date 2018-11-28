import Vue from 'vue'

export const login = function(payload,success,error){
    Vue.http.post("/seller/login",payload).then(success,error);
}