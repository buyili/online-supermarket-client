import Vue from 'vue'

export function login(payload, success, error) {
    Vue.http.post("admin/login", payload).then(({body})=>{
        success(body)
    }, error);
}

export function logout(){
    localStorage.removeItem('token');
    Vue.$Message({
        message:"登出成功",
        type:'success'
    })
}