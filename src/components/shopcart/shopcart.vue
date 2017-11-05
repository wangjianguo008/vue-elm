<template>
  <div class="shopcart">
  	<div class='content'>
  		<div class="content-left">
  			<div class="logo-wrapper">
  				<div class="logo" :class="{'heightLight':totalCount>0}">
  					<span class="icon-shopping_cart" :class="{'heightLight':totalCount>0}"></span>
  				</div>
  				<div class="num" v-show="totalCount>0">
  					{{totalCount}}
  				</div>
  			</div>
  			<div class="price" :class="{'heightLight':totalPrice>0}">￥{{totalPrice}}元</div>
  			<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
  		</div>
  		<div class="content-right">
  			<div class="pay" :class='payClass'>
  				{{payDesc}}
  			</div>
  		</div>
  	</div>
  </div>
</template>

<script>
	export default{
		props:{
			selectFoods:{
				type:Array,
				default(){
					return [
						{
							price:50,
							count:1
						}
					];
				}
			},
			deliveryPrice:{
				type:Number,
				default:0
			},
			minPrice:{
				type:Number,
				default:0
			}
		},
		computed:{
			totalPrice(){
				let total=0;
				this.selectFoods.forEach((food)=>{
					total+=food.price*food.count;
				});
				return total;
			},
			totalCount(){
				let count=0;
				this.selectFoods.forEach((food)=>{
					count+=food.count;
				})
				return count;
			},
			payDesc(){
				if(this.totalPrice===0){
					return `￥${this.minPrice}元起送`
				}else if(this.totalPrice<this.minPrice){
					let diff=this.minPrice-this.totalPrice
					return `还差￥${diff}元起送`
				}else{
					return '去结算'
				}
			},
			payClass(){
				if(this.totalPrice<this.minPrice){
					return 'not-enough'
				}else{
					return 'enough'
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
	.shopcart{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 50;
		width: 100%;
		height: 48px;
		.content{
			display: flex;
			background:#141d27;
			font-size: 0;
			height:48px;
			color:rgba(255,255,255,0.4);
			.content-left{
				flex:1;
				.logo-wrapper{
					display: inline-block;
					position: relative;
					top:-10px;
					margin:0 12px;
					padding: 6px;
					width: 56px;
					height: 56px;
					box-sizing: border-box;
					vertical-align: top;
					border-radius: 50%;
					background: #141d27;
					.logo{
						width: 100%;
						height: 100%;
						border-radius: 50%;
						background: #2b343c;
						text-align: center;
						&.heightLight{
							background: rgb(0,160,220);
						}
						.icon-shopping_cart{
							font-size: 24px;
							color:#88858a;
							line-height: 44px;
							&.heightLight{
								color:#fff;
							}
						}
					}
					.num{
						position: absolute;
						top:0;
						right: 0;
						width: 24px;
						height: 16px;
						line-height: 16px;
						text-align: center;
						font-size: 9px;
						font-weight: 700;
						color:#fff;
						background: rgb(240,20,20);
						border-radius: 16px;
						box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
					}
				}
				.price{
					display: inline-block;
					vertical-align: top;
					line-height: 24px;
					margin-top:12px;
					box-sizing: border-box;
					padding-right: 12px;
					border-right: 1px solid rgba(255,255,255,0.1);
					font-size: 16px;
					font-weight: 700;
					&.heightLight{
						color:#fff;
					}
				}
				.desc{
					display:inline-block;
					vertical-align:top;
					line-height:24px;
					padding-left:12px;
					font-size:10px;
					margin-top:12px;
				}
			}
			.content-right{
				flex:0 0 105px;
				width:105px;
				.pay{
					height: 48px;
					line-height: 48px;
					text-align: center;
					font-size: 12px;
					font-weight: 700;
					&.not-enough{
						background: #2b333b;
					}
					&.enough{
						background: #00b43c;
						color:#fff;
					}
				}	
			}
		}
	}
</style>

