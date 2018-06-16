import axios from "axios"
let instance=axios.create({
    header:{
       // "Content-Type":"application/json"
    }
})
instance.interceptors.request.use((config)=>{
    return config
},(err)=>{
    return new Promise(err)
})
instance.interceptors.response.use((response)=>{
    return response
},(err)=>{
    return new Promise(err)
})
let httpPlugin={
    install(Vue){
        Object.defineProperty(Vue.prototype,"http",{
            value:instance
        })
    }
}
export default httpPlugin;