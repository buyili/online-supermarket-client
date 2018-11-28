import { Message } from 'element-ui';

export const message = {
    success:function(msg){
        return Message.success({
            message:msg,
            center:true
        })
    }
}
const plugin = {}

export default plugin.install = function(Vue, options){
    Vue.prototype._message = message;
}