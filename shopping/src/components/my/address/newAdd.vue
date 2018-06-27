<template>
    <div class="addBox">
        <header class="header">
            <i class="icon iconfont icon-xaingzuo" @click="backFn"></i>
            <span>收货人</span>
            <span></span>
        </header>
        <div class="infor">
            <p><input type="text" placeholder="收货人姓名" v-model="username"></p>
            <p><input type="text" placeholder="手机号" v-model="phone"></p>
            <div class="province">
                <p>
                    <multiselect v-model="province" :options="provincelist" label="name" placeholder="请选择省份" @select="onSelect">
                    </multiselect>
                </p>
                <p>
                    <multiselect v-model="city" :options="citylist" label="name" placeholder="请选择城市" @select="onSelectCity">
                    </multiselect>
                </p>

            </div>
            <p class="area">
                <multiselect v-model="area" :options="arealist" placeholder="请选择区">
                </multiselect>
            </p>
            <p><input type="text" name="" id="" placeholder="详细地址" v-model="street"></p>
            <div><input type="checkbox">设为默认地址</div>
            <p class="submit">
                <button @click="submit">保存</button>
            </p>
        </div>
        <toast></toast>
    </div>

</template>
<script>
import { getCookie } from "@/utils/cookies"
import Multiselect from 'vue-multiselect';
import axios from "axios"
import "vue-multiselect/dist/vue-multiselect.min.css";
export default {
    data() {
        return {
            province: '',
            city: '',
            area: '',
            street: '',
            username: '',
            phone: '',
            provincelist: [1, 3, 4, 5],
            citylist: [],
            arealist: [],
            id:null
        }
    },
    created() {
        axios.get("/server/address/address.json").then(res => {
            this.provincelist = res.data;
        })
    },
    mounted(){
        if(this.$route.params.type=="edit"){
            let {province,city,area,street,username,phone,id}=this.$route.params.data;
            this.province=province;
            this.city=city;
            this.area=area;
            this.street=street;
            this.username=username;
            this.phone=phone;
            this.id=id
            console.log(this.id)
        }
        console.log(this.$route.params)
    },
    methods: {
        backFn() {
            this.$router.push("/region")
        },
        onSelect(a, b) {
            this.city = "";
            this.area = "";
            this.citylist = a.city;
        },
        onSelectCity(a, b) {
            this.arealist = a.area;
        },
        submit() {
            if (!this.province || !this.username || !this.area || !this.street || !this.phone || !this.province || !this.city) {
                this.$toastBus.$emit("toast", "请填写全部信息")
                return;
            }
            if (!/^1[5836]\d{9}$/.test(this.phone)) {
                this.$toastBus.$emit("toast", "请填写正确格式的手机号")
                return;
            }

            this.http.post("/addaddr", {
                token: getCookie("token"), data: {
                    username: this.username, phone: this.phone, province: this.province.name, city: this.city.name, area: this.area, street: this.street,id:this.id}}).then(res => {
                if (res.data.code == 0) {
                    this.$router.push({ name: "login", params: { from: "newAdd" } })
                } else {
                    this.$toastBus.$emit("toast", "添加成功")
                    setTimeout(() => {
                        this.$router.push({ name: "region", params: { from: "newAdd" } })
                    }, 1500);
                }
            })
        }
    },
    components: {
        Multiselect
    }
}
</script>
<style scoped>
.addBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  height: 0.9rem;
  line-height: 0.9rem;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
}
.infor {
  background: #eee;
  padding: 10px;
  flex: 1;
}
.infor p {
  padding: 10px;
  height: 60px;
}
.infor p input {
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  text-indent: 1em;
}
.province {
  display: flex;
  justify-content: space-between;
}
.province p {
  width: 50%;
}
.province select {
  width: 40%;
}
.area select {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
}
.area select option {
  width: 100%;
}
.submit {
  height: 2.9rem;
  line-height: 2.9rem;
  text-align: center;
}
.submit button {
  height: 1rem;
  width: 4.5rem;
  background: #fc4141;
  border-radius: 20px;
  color: #fff;
  text-align: center;
  line-height: 1rem;
  border: none;
  font-size: 20px;
  outline: none;
}
</style>



