import "./style.css"
import Item from "./toastItem"
let toastPlugin={
    install(Vue){
        Vue.component("toast",{
          data(){
              return{
                  msg:[],
              }
          },
          template:"<div class='toastBox'><Item v-for='(items,ind) in msg' :key='ind'>{{items}}</Item></div>",
          methods:{
             active(msg){
                 this.msg.push(msg)
             }
          },
          components:{
              Item
          }
        })
    }
}
export default toastPlugin;