<template>
    <dl>
        <dt>
            <input type="checkbox" checked="item.book">
            <img :src="item.imageurl" alt="">
        </dt>
        <dd>
            <p>
                {{item.wname}}
            </p>
            <div>
                <aside class="divri">
                    <span style="color:#a3a3a3;">x{{item.canAddCart}}</span>
                    <p style="color:red;">￥{{item.jdPrice}}</p>
                </aside>
                <aside class="btns">
                    <span>-</span>
                    <span>{{item.count}}</span>
                    <span @click="addNum(item)">+</span>
                </aside>
            </div>

        </dd>
    </dl>
</template>
<script>
import {getCookies} from "../../utils/cookies"
export default {
    props:{
        item:{
            required:true,
            type:Object
        }
    },
    methods:{
        addNum(item){
            this.http.post("/addNum",{token:getCookies("token"),item:item}).then(res=>{
                console.log(res)
            })
        }
    }
}
</script>

<style>
 dl {
  display: flex;
  height: 2.6rem;
  background: #fff;
  margin: 4px 0;
  padding: 2px;
}
 dl dt {
  width: 3rem;
  display: flex;
  padding: 3px;
  flex: 1;
  box-sizing: border-box;
}
 dl dt input {
  margin-top: 1.3rem;
}
 dl dt img {
  width: 2.6rem;
  padding: 5px;
}
 dl dd {
  font-size: 0.25rem;
  padding: 10px;
}
 dl dd div {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
}
 dl dd p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>

