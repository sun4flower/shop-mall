import "./style.css"
import Confirm from "./confirm.vue"
let confirmPlugin = {

    install(Vue) {
        let confirmBus = new Vue()
        Object.defineProperty(Vue.prototype, "$confirmBus", { value: confirmBus })
        Vue.component("confirm", {
            data() {
                return {
                    msg: '',
                    isActive: false
                }
            },
            template: "<div class='confirm-wrap' v-if='isActive'><Confirm :msg='msg'></Confirm></div>",
            mounted() {
                confirmBus.$on("confirm", (msg) => {
                    if (msg.show) {
                        this.msg = msg.msg;
                        this.isActive = true;
                    } else {
                        this.isActive = false;
                    }

                    // confirmBus.$emit("send",)
                })
            },
            // methods:{

            // },
            components: {
                Confirm
            }
        })
    }
}
export default confirmPlugin;