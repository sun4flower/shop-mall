<template>
    <div class="infors">
        <div class="confirms">
            <div>{{msg}}</div>
            <div @click="confirm">确认</div>
        </div>
        <div class="cancel" @click="cancel">取消</div>
    </div>
</template>
<script>
export default {
    props:["msg"],
    data(){
        return {
          
        }
    },
    methods:{
        confirm(){
            this.$confirmBus.$emit("send",true)
        },
        cancel(){
             this.$confirmBus.$emit("send",false)
        }
    }
}
</script>
<style>
.infors{
    position: absolute;
     width: 100%;
    left:0;
    bottom:0;
    padding: 0 .1rem;
}
.confirms{
    height: 1.6rem;
    background: #fff;
     border-radius: 5px;
}
.confirms div,.cancel{
    height: .8rem;
    line-height: .8rem;
    text-align: center;
    font-size: .2rem;
    border-radius: 5px;
    background: #fff;
    border-bottom: 1px solid #eee;
}
.cancel{
    margin:.1rem 0;
}
</style>



