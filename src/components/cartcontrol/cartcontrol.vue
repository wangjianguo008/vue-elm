<template>
  <div class="cartcontrol">
    <transition name='move'>
      <div class="cart-decrease" v-show='food.count>0' @click="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show='food.count>0'>{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script>
import Vue from "vue"
  export default{
    props:{
      food:{
        type:Object
      }
    },
    created(){
      
    },
    methods:{
      addCart(event){
        //pc默认点击制作一次的点击
        if(!event._constructed){return}
        if(!this.food.count){
          //没有操作数据this.food.count=1;使用vue来创建food属性
          Vue.set(this.food,"count",1);
        }else{
          this.food.count++;
        }
      },
      decreaseCart(event){
        if(!event._constructed){return}
        if(this.food.count){
          this.food.count--;
        }
      }
    }
  }
</script>

<style lang="less">
  .cartcontrol{
    font-size: 0;
    .cart-decrease{
      display: inline-block;
      padding: 6px;
      transition:all 0.4s linear;
      transform:translate3d(0,0,0);
      opacity:1;
      .inner{
        display:inline-block;
        text-align:center;
        font-size:24px;
        line-height:24px;
        color: rgb(0, 160, 220);
        transition:all 0.4s linear;
        transform:rotate(0deg);
      }
      &.move-enter, &.move-leave-active{
          transition: all 0.4s linear;
          opacity: 0;
          transform: translate3d(24px, 0, 0);
          .inner{
              transform: rotate(180deg);
          }
        }
      }
    .cart-count{
      display: inline-block;
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: rgb(147,153,159);
    }
    .cart-add{
      display: inline-block;
      padding: 6px;
      line-height: 24px;
      font-size: 24px;
      color:rgb(0,160,220);
    }
  }
</style>
