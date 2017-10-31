<template>
  <div class="goods">
    <div class="menu-wrapper">
    	<ul>
    		<li v-for='item in goods' class="menu-item">
    			<span class="text border-1px">
    				<span class="icon" v-show='item.type>0' :class='classMap[item.type]'></span>{{item.name}}
    			</span>
    		</li>
    	</ul>
    </div>
    <div class="foos-wrapper">
    	<ul>
    		<li v-for='item in goods' class="food-list">
    			<h1 class="title">{{item.name}}</h1>
    			<ul>
    				<li v-for='food in item.foods' class="food-item border-1px">
    					<div class="icon">
    						<img :src='food.icon'>
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
    					</div>
    				</li>
    			</ul>
    		</li>
    	</ul>
    </div>
  </div>
</template>

<script>
	const ERR_OK=0;
	export default{
		props:['seller'],
		data(){
			return{
				goods:[]
			}
		},
		created(){
			this.classMap=["decrease","discount","special","invoice","guarantee"];
			this.$http.get('/api/goods').then((req)=>{
				req=req.body;
				if(req.erron===ERR_OK){
					this.goods=req.data;
				}
			})
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
				.text{
					font-size: 12px;
					display: table-cell;
					width:56px;
					vertical-align: middle;
					.border-1px(rgba(7,17,27,0.1));
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
						line-height: 10px;
						margin-bottom: 8px;
					}
					.extra{
						line-height: 12px;
						&.count{
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
				}
			}
		}
	}
</style>

