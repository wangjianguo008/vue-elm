<template>
  <div class="goods">
    <div class="menu-wrapper" ref='menuWrapper'>
    	<ul>
    		<li v-for='(item,index) in goods' class="menu-item" :class="{'current':currentIndex===index}" 
    		@click='selectMenu(index,$event)'>
    			<span class="text border-1px">
    				<span class="icon" v-show='item.type>0' :class='classMap[item.type]'></span>{{item.name}}
    			</span>
    		</li>
    	</ul>
    </div>
    <div class="foos-wrapper" ref='foodWrapper'>
    	<ul>
    		<li v-for='(item,index) in goods' class="food-list" ref='foodListHook'>
    			<h1 class="title">{{item.name}}</h1>
    			<ul>
    				<li v-for='food in item.foods' class="food-item border-1px">
    					<div class="icon">
    						<img width="57" height="57" :src="food.icon">
    					</div>
    					<div class="content">
    						<h2 class="name">{{food.name}}</h2>
    						<p class="desc">{{food.description}}</p>
    						<div class="extra">
    							<span class="count">月售{{food.sellCount}}份</span>
    							<span>好评率{{food.rating}}%</span>
    						</div>
    						<div class="price">
    							<span class="now">￥{{food.price}}</span>
    							<span v-show='food.oldPrice' class="old">￥{{food.oldPrice}}</span>
    						</div>
    						<div class="cartcontrol-wrapper">
    							<cartcontrol :food="food"></cartcontrol>
    						</div>
    					</div>
    				</li>
    			</ul>
    		</li>
    	</ul>
    </div>
    <shopCart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopCart>
  </div>
</template>

<script>
	import BScroll from 'better-scroll'
	import shopCart from "../../components/shopcart/shopcart"
	import cartcontrol from "../../components/cartcontrol/cartcontrol"
	const ERR_OK=0;
	export default{
		props:['seller'],
		data(){
			return{
				goods:[],
				listHeight:[],
				scrollY:0
			}
		},
		computed:{//左侧走第几个标题，属于下标
			currentIndex(){
				for(let i=0;i<this.listHeight.length;i++){
					let height1=this.listHeight[i];
					let height2=this.listHeight[i+1];
					if(!height2||(this.scrollY>=height1&&this.scrollY<height2)){
						return i;
					}
				}
				return 0;
			},
			selectFoods(){
				let foods=[];
				this.goods.forEach((good)=>{
					good.foods.forEach((food)=>{
						if(food.count){
							foods.push(food);
						}
					})
				})
				return foods
			}
		},
		created(){
			this.classMap=["decrease","discount","special","invoice","guarantee"];
			this.$http.get('/api/goods').then((req)=>{
				req=req.body;
				if(req.erron===ERR_OK){
					this.goods=req.data;
					this.$nextTick(()=>{//初始化
						this._initScroll();
						this._calculateHeight();
					})
				}
			})
		},
		methods:{
			selectMenu(index){
				//阻止pc的默认点击(_constructed)api
				if(!event._constructed){
					return;
				}
				let foodList=this.$refs.foodListHook;
				let el=foodList[index];
				this.foodScroll.scrollToElement(el,10);
			},
			_initScroll(){
				this.menuScroll=new BScroll(this.$refs.menuWrapper,{
					click:true  //默认派发点击事件
				});
				this.foodScroll=new BScroll(this.$refs.foodWrapper,{
					click:true,
					probeType:3//滚动的一个探针,相当于是个监听
				});
				this.foodScroll.on('scroll',(pos)=>{
					this.scrollY=Math.abs(Math.round(pos.y));//abs正直，round是整数
				})
			},
			_calculateHeight(){
				let foodList=this.$refs.foodListHook;
				let heights=0;
				this.listHeight.push(heights);
				for(let i=0;i<foodList.length;i++){
					let item=foodList[i];
					heights+=item.clientHeight;//每个区间的高度
					this.listHeight.push(heights);

				}
			}
		},
		components:{
			shopCart,
			cartcontrol
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
@import "../../common/less/mixin.less";
	.goods{
		position: absolute;
		top:174px;
		bottom:46px;
		display:flex;
		width:100%;
		overflow: hidden;
		.menu-wrapper{
			flex:0 0 80px;
			width: 80px;
			background: #f3f5f7;
			.menu-item{
				//始终再中间
				display: table;
				height:54px;
				width: 56px;
				padding:0 12px;
				line-height: 14px;
				&.current{
					position: relative;
					margin-top: -1px;
					background: #fff;
					z-index: 10;
					font-weight: 700;
				}
				.text{
					.border-none();
					font-size: 12px;
					display: table-cell;
					width:56px;
					vertical-align: middle;
					.border-1px(rgba(7,17,27,0.1));
					.icon{
						display: inline-block;
						width: 12px;
						height: 12px;
						margin-right: 4px;
						background-size: 12px 12px;
						background-repeat: no-repeat;
						&.decrease{
							.bg-image("decrease_3");
						}
						&.discount{
							.bg-image("discount_3");
						}
						&.guarantee{
							.bg-image("guarantee_3");
						}
						&.invoice{
							.bg-image("invoice_3");
						}
						&.special{
							.bg-image("special_3");
						}
					}
				}
			}
		}
		.foos-wrapper{
			flex:1;
			.title{
				padding-left: 14px;
				height:26px;
				line-height: 26px;
				border-left: 2px solid #d9dde1;
				font-size: 12px;
				color: rgb(147,153,159);
				background: #f3f5f7;
			}
			.food-item{
				display: flex;
				margin:18px;
				padding-bottom:18px; 
				.border-1px(rgba(7,17,27,0.1));
				&:last-child{
					.border-none();
					margin-bottom: 0;
				}
				.icon{
					flex:0 0 57px;
					margin-right:10px;
				}
				.content{
					flex:1;
					.name{
						margin:2px 0 8px 0;
						height:14px;
						line-height:14px;
						font-size:14px;
						color:rgb(7,17,27);
					}
					.desc,.extra{
						font-size: 10px;
						color: rgb(147,153,159);
					}
					.desc{
						line-height: 12px;
						margin-bottom: 8px;
					}
					.extra{
						line-height: 12px;
						.count{
							margin-right:8px;
						}
					}
					.price{
						font-weight: 700;
						line-height: 24px;
						.now{
							margin-right: 8px;
							font-size: 14px;
							color: rgb(240,20,20);

						}
						.old{
							text-decoration: line-through;
							font-size: 10px;
							color: rgb(147,153,159);
						}
					}
					.cartcontrol-wrapper{
						position: absolute;
						right:0;
						bottom:12px;
					}
				}
			}
		}
	}
</style>

