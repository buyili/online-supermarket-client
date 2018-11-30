import Vue from 'vue'
import { message } from '../../util/pluginWrapElementUI.js'
import router from '../router.js'
import { type } from 'os';



const resStatus = {
    // INFO(100), //信息，服务器收到请求，需要请求者继续执行操作
    // SUCCESS(200,"成功"),
    // REDIRECT(300),
    // CLIENT_ERR(400,"客户端错误"),
    // PARAMETER_ERR(401,"参数错误"),
    // NOT_REGISTER(402,"未注册"),
    // NOT_STORE(403,"未开通商店"),
    // NOT_LOGIN(404,"未登录"),
    // REGISTERED(405,"已注册"),

    // SERVER_ERR(500,"服务端错误")
    SUCCESS: 200,
    REDIRECT: 300,
    NOT_LOGIN: 404
}

const filter = function (body, { status }, success, error) {
    if (status == resStatus.SUCCESS) {
        success(body);
        return;
    }
    if (status == resStatus.NOT_LOGIN) {
        router.push({ name: 'login' })
        return;
    }
    error(body);
}

export function login(payload, success, error) {
    Vue.http.post("admin/login", payload).then(({ body }) => {
        success(body)
    }, error);
}

export function logout(cb) {
    localStorage.removeItem('token');
    message.success("登出成功")
    cb();
}

export function queryAllTrademarks(success, error) {
    Vue.http.get('trademarks').then(({ body }) => {
        filter(body, body, success, error)
    })
}

export function delTrademark(trademarkId, success, error) {
    Vue.http.delete('admin/trademarks/' + trademarkId).then(({ body }) => { filter(body, body, success, error) })
}

export function addTrademark({ data, file }, success, error) {
    let formData = new FormData;
    formData.append("name", data.name);
    formData.append("file", file);
    Vue.http.post("admin/trademarks/add", formData, {
        headers: {
            emulateJSON: false
        }
    }
    ).then(({ body }) => { filter(body, body, success, error) }).catch()
}

export function queryAllCategories(success, error) {
    Vue.http.get("categories").then(({ body }) => {
        filter(body, body, success, error);
    })
}

export function addCategory(payload, success, error) {
    Vue.http.post('admin/category/add', payload).then(({ body }) => { filter(body, body, success, error) })
}

export function delCategory(categoryId, success, error) {
    Vue.http.delete("admin/categories/" + categoryId).then(({ body }) => { filter(body, body, success, error) })
}


export function queryAttrByCategoryId(categoryId,success,error){
    Vue.http.get(categoryId + "/attrs").then(({body})=>{
        filter(body, body, success, error);
    })
}

export function addAttr(payload,success,error){
    let arr = [];
    arr.push(payload);
    Vue.http.post("attrs/add",arr).then(({body})=>{
        filter(body, body, success, error);
    })
}
export function delAttr(attrId,success,error){
    Vue.http.delete("admin/attrs/"+attrId).then(({body})=>{
        filter(body, body, success, error);
    })
}