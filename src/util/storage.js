const storage = {
    local: {
        setItem: (key, value) => {
            localStorage.setItem(key, JSON.stringify(value))
        },
        getItem: (key) => {
            return JSON.parse(localStorage.getItem(key));
        },
        removeItem: (key) => {
            localStorage.removeItem(key);
        }
    },
    session: {
        setItem: (key, value) => {
            sessionStorage.setItem(key, JSON.stringify(value))
        },
        getItem: (key) => {
            return JSON.parse(sessionStorage.getItem(key));
        },
        removeItem: (key) => {
            sessionStorage.removeItem(key);
        }
    },
    install:function(Vue){
        Vue.prototype._local = this.local;
        Vue.prototype._session = this.session;
    }
}

export default storage;

