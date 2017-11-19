<template>
	<transition name="move">
		<div class="food" v-show="showFlag" ref="food">
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
						<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="cartcontrol-wrapper" v-show="food.count>0">
						<cartcontrol @add="addFood" :food="food"></cartcontrol>
					</div>
					<transition name="fade">
						<div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0">
							加入购物车
						</div>
					</transition>
				</div>
				<split v-show="food.info"></split>
				<div class="info" v-show="food.info">
					<h1 class="title">商品信息</h1>
					<p class="text">{{food.info}}</p>
				</div>
				<split v-show="food.info"></split>
				<div class="rating">
					<h1 class="title">
						商品评价
					</h1>
					<ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings" @select="selectRating" @onlyContent="toggleContent"></ratingselect>
					<div class="rating-wrapper">
						<ul v-show="food.ratings && food.ratings.length">
							<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
								<div class="user">
									<span class="name">{{rating.username}}</span>
									<img :src="rating.avatar" width="12" height="12" class="avatar">
								</div>
								<div class="time">{{rating.rateTime | formatDate}}</div>
								<p class="text">
									<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
								</p>
							</li>
						</ul>
						<div v-show="!food.ratings || !food.ratings.length" class="no-rating">暂无评价</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import BScroll from 'better-scroll'
	import Vue from "vue"
	import cartcontrol from "../../components/cartcontrol/cartcontrol"
	import split from "../../components/split/split"
	import ratingselect from "../../components/ratingselect/ratingselect"
	import {formatDate} from "../../common/js/date"
	const POSITIVE=0;//部分
	const NEGATIVE=1;//没有
	const ALL=2;//全部
	export default{
		props:['food'],
		data(){
			return{
				showFlag:false,
				selectType:ALL,
				onlyContent:true,
				desc:{
					all:"全部",
					positive:'推荐',
					negative:'吐槽'
				}
			}
		},
		methods:{
			show(){
				this.showFlag=true;
				this.selectType=ALL;
				this.onlyContent=true;
				this.$nextTick(()=>{
					if(!this.scroll){
						this.scroll=new BScroll(this.$refs.food,{
							click:true
						})
					}else{
						this.scroll.refresh();
					}
				})
			},
			hide(){
				this.showFlag=false
			},
			addFood(target){
			    //当前组件必须在父组件 引入处，bangding @add="xxx",继而执行 父组件的 xxx 方法
		        this.$emit('add',target);
			},
			addFirst(event){
				if(!event._constructed) return;
				this.$emit('add',event.target);
				Vue.set(this.food,"count",1);//默认数量为1
			},
			needShow(type,text){
				if(this.onlyContent && !text){
					return false
				}else if(this.selectType===ALL){
					return true
				}else{
					return type===this.selectType
				}
			},
			selectRating(type){
			    this.selectType = type;
			    this.$nextTick(()=> {
					this.scroll.refresh();
				})
			},
			toggleContent(onlyContent){
			    this.onlyContent = !onlyContent;

				this.$nextTick(()=> {
					this.scroll.refresh();
				})
			}
		},
		components:{
			cartcontrol,
			split,
			ratingselect
		},
		computed:{},
		filters:{
			formatDate(time){
				let date=new Date(time);
				return formatDate(date,'yyyy-MM-dd hh:mm');
			}
		},
		updated(){
		    this.$nextTick(()=>{
		        this.scroll && this.scroll.refresh();
			})
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
@import "../../common/less/mixin.less";
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
			.content{
				padding:18px;
				position: relative;
				.title{
					line-height: 14px;
					margin-bottom: 8px;
					font-size: 14px;
					font-weight: 700;
					color: rgb(7,17,27);
				}
				.details{
					margin-bottom: 18px;
					line-height: 10px;
					height: 10px;
					.sell-count,.rating{
						font-size: 10px;
						color: rgb(147,153,159);
					}
					.sell-count{
						margin-right: 12px;
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
					right: 12px;
					bottom: 12px;
				}
				.buy{
					position: absolute;
					right: 18px;
					bottom: 18px;
					z-index: 10px;
					height: 24px;
					line-height: 24px;
					padding: 0 12px;
					box-sizing: border-box;
					font-size: 12px;
					border-radius: 10px;
					color: #fff;
					background: rgb(0,160,220);
					opacity: 1;
					&.fade-enter-active,&.fade-leave-active{
						transition: all 0.2s linear;
					}
					&.fade-enter,&.fade-leave-active{
						opacity: 0;
						z-index: -1;

					}
				}
			}
			.info{
				padding: 18px;
				.title{
					line-height: 14px;
					margin-bottom: 6px;
					font-size: 14px;
					color:rgb(7,17,27);
				}
				.text{
					line-height: 24px;
					color: rgb(77,85,93);
					padding: 0 8px;
					font-size: 12px;
				}
			}
			.rating{
				padding-top: 18px;
				.title{
					line-height: 14px;
					margin-left: 18px;
					font-size: 14px;
					color:rgb(7,17,27);
				}
				.rating-wrapper{
					padding:0 18px;
					.rating-item{
						position: relative;
						padding: 16px 0;
						.border-1px(rgba(7,17,27,0.1));
						.user{
							position: absolute;
							right:0;
							top:16px;
							font-size: 0;
							line-height: 12px;
							.name{
								color: rgb(147,153,159);
								display: inline-block;
								vertical-align: top;
								font-size: 10px;
								margin-right: 6px;
							}
							.avatar{
								border-radius: 50%;
							}
						}
						.time{
							font-size: 10px;
							line-height: 12px;
							color: rgb(147,153,159);
							margin-bottom: 6px;
						}
						.text{
							line-height: 16px;
							font-size: 12px;
							color: rgb(7,17,27);
							.icon-thumb_down,.icon-thumb_up{
								margin-right: 4px;
								line-height: 16px;
								font-size: 12px;
							}
							.icon-thumb_up{
								color: rgb(0,160,220);
							}
							.icon-thumb_down{
								color: rgb(147,153,159);
							}
						}
					}
					.no-rating{
						padding:16px;
						font-size: 12px;
						color: rgb(147,153,159);
					}
				}
			}
		}
	}
</style>

