import "./style.css"
import Item from "./toastItem"
let toastPlugin = {
    install(Vue) {
        const toastBus=new Vue()
       Object.defineProperty(Vue.prototype,"$toastBus",{
           value:toastBus
       })
        Vue.component("toast", {
            data() {
                return {
                    msg: [],
                }
            },
            template: "<div class='toastBox'><Item v-for='(items,ind) in msg' :key='ind'>{{items}}</Item></div>",
            methods: {
                active(msg) {
                    this.msg.push(msg)
                }
            },
            mounted(){
                toastBus.$on("toast",(msg)=>{
                    this.active(msg)
                })
            },
            components: {
                Item
            }
        })
    }
}
export default toastPlugin;