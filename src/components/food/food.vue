<template>
	<transition name="move">
		<div class="food" v-show="showFlag">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image">
					<div class="back" @click="hide()">
						<span class="icon-arrow_lift"></span>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="details">
						<span class="sell-count">{{food.sellCount}}</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span>
						<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default{
		props:['food'],
		data(){
			return{
				showFlag:false
			}
		},
		methods:{
			show(){
				this.showFlag=true
			},
			hide(){
				this.showFlag=false
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
	.food{
		position: fixed;
		top:0;
		left: 0;
		bottom:48px;
		z-index: 30;
		width: 100%;
		background: #fff;
		&.move-enter-active,&.move-leave-active{
			transform: translate3d(0,0,0);
			transition: all 0.5s linear;
		}
		&.move-enter,&.move-leave-active{
			transform: translate3d(100%,0,0);
		}
		.food-content{
			.image-header{
				position: relative;
				width: 100%;
				height: 0;
				padding-top: 100%;//此处的的100%，相当于宽度的100%，防止网络慢而加载跳动
				img{
					position: absolute;
					top:0;
					left: 0;
					width: 100%;
					height: 100%;
				}
				.back{
					position: absolute;
					left: 0;
					top:10px;
					.icon-arrow_lift{
						display: block;
						padding: 10px;
						font-size: 20px;
						color: #fff;
					}
				}
			}
		}
	}
</style>

