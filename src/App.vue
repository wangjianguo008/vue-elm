<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to='/goods'>商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/ratings'>评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/seller'>商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller='seller'></router-view>
    </keep-alive>  
  </div>
</template>

<script>
  import header from './components/header/header';
  import {urlParse} from './common/js/date.js';
  const ERR_OK=0
  export default{
    data(){
        return{
          seller:{
            id:(()=>{
              let queryParam=urlParse();
              return queryParam.id;
            })()
          }
        }
      },
      created(){
        let that=this;
        /*使用模拟线上的数据库monk.js*/
        /*this.$http.get('https://www.easy-mock.com/mock/596e2463a1d30433d836f112/ele/ele?id=' + this.seller.id).then((response)=>{
          console.log(response.body.seller);
          let data=response.body.seller;
          this.seller=Object.assign({},this.seller,data);
        })*/
        this.$http.get('/api/seller?id='+this.seller.id).then((req)=>{
          req=req.body;
          if(req.erron===ERR_OK){
            /*that.seller=req.data;*/
            this.seller=Object.assign({},this.seller,req.data);
          }
        })
      },
    components:{
      'v-header':header
    }
  }
</script>

<style lang="less">
  @import './common/less/mixin.less';
    .tab{
      display: flex;
      width: 100%;
      height: 40px;
      line-height: 40px;
      .border-1px(rgba(7,17,27,0.1));
      .tab-item{
        flex:1;
        text-align: center;
        &>a{
          display: block;
          font-size: 14px;
          color:rgb(77,85,93);
        }
        .router-link-active{
          color:rgb(240,20,20);
        }
      }
    }
</style>
