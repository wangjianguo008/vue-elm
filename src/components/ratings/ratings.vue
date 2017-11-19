<template>
	<div>
		<div class="ratings" ref="ratings">
			<div class="ratings-content">
				<div class="overview">
					<div class="overview-left">
						<h1 class="score">
							{{seller.score}}
						</h1>
						<div class="title">
							综合评分
						</div>
						<div class="rank">高于周边商家{{seller.rankRate}}%</div>
					</div>
					<div class="overview-right">
						<div class="score-wrapper">
							<span  class="title">服务态度</span>
							<star :size='36' :score="seller.serviceScore"></star>
							<span class="score">{{seller.serviceScore}}</span>
						</div>
						<div class="score-wrapper">
							<span class="title">商品评分</span>
							<star :size="36" :score="seller.foodScore"></star>
							<span class="score">{{seller.foodScore}}</span>
						</div>
						<div class="delivery-wrapper">
							<span class="title">送达时间</span>
							<span class="delivery">{{seller.deliveryTime}}分钟</span>
						</div>
					</div>
				</div>
				<split></split>
				<ratingselect :select-type="selectType" :only-content="onlyContent" :ratings="ratings" @select="selectRating" @onlyContent="toggleContent"></ratingselect>
				<div class="ratings-wrapper">
					<ul>
						<li class="rating-item" v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)">
							<div class="avatar">
								<img :src="rating.avatar" width="28" height="28">
							</div>
							<div class="content">
								<div class="name">{{rating.username}}</div>
								<div class="star-wrapper">
									<star :size="24" :score="rating.score"></star>
									<div class="delivery">{{rating.deliveryTime}}分钟送达</div>
								</div>
								<p class="text">{{rating.text}}</p>
								<div class="recommend" v-show="rating.recommend && rating.recommend.length">
									<span class="icon-thumb_up"></span>
									<span class="item" v-for="item in rating.recommend">{{item}}</span>
								</div>
								<div class="time">
									{{rating.rateTime | formatDate}}
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<shopCart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopCart>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import star from '../../components/star/star'
import split from '../../components/split/split'
import ratingselect from '../../components/ratingselect/ratingselect'
import {formatDate} from "../../common/js/date"
import shopCart from "../../components/shopcart/shopcart"
const ALL = 2;
const ERR_OK=0;
	export default{
		props:["seller"],
		components:{
			star,
			split,
			ratingselect,
			shopCart
		},
		data(){
			return{
				ratings:[],
				selectType:ALL,
				onlyContent:true
			}
		},
		created(){
			this.$http.get('/api/ratings').then((res)=>{
				res=res.body;
				if(res.erron===ERR_OK){
					this.ratings=res.data;
					this.$nextTick(()=>{
						this.scroll=new BScroll(this.$refs.ratings,{
							click:true
						})
					})
				}
			})
		},
		filters:{
		    formatDate(time){
		        let date = new Date(time);
		        return formatDate(date,'yyyy-MM-dd hh:mm');
			}
		},
		methods:{
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
		updated(){
		    this.$nextTick(()=>{
		        this.scroll && this.scroll.refresh();
			})
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../../common/less/mixin.less";
	.ratings{
		position: absolute;
		top:174px;
		bottom:46px;
		left: 0;
		width: 100%;
		overflow: hidden;
		.ratings-content{
			.overview{
				display:flex;
				padding:18px 0;
				.overview-left{
					flex:0 0 137px;
					padding : 6px;
					width:137px;
					border-right:1px solid rgba(7,17,27,0.1);
					text-align :center;
					@media only screen and (max-width: 320px) {
						flex: 0 0 120px;
						width: 120px;
					}
					.score{
						font-size:24px;
						color: rgb(255, 153, 0);
						line-height :28px;
						margin-bottom :6px;
					}
					.title{
						color: rgb(7, 17, 27);
						font-size :12px;
						line-height :12px;
						margin-bottom :8px;
					}
					.rank{
						color: rgb(147, 153, 159);
						font-size :10px;
						line-height :10px;
					}
				}
				.overview-right{
					flex:1;
					padding:6px 0 6px 14px;
					@media only screen and (max-width: 320px) {
						padding-left: 6px;
					}
					.score-wrapper{
						margin-bottom :8px;
						font-size :0;
						.title{
							display :inline-block;
							font-size :12px;
							line-height :18px;
							vertical-align :top;
							color: rgb(7,17,27);
						}
						.star{
							display :inline-block;
							margin:0 12px;
							vertical-align :top;
						}
						.score{
							display :inline-block;
							vertical-align :top;
							color :rgb(255,153,0);
							line-height :18px;
							font-size :12px;
						}
					}
					.delivery-wrapper{
						font-size :0;
						.title{
							font-size :12px;
							line-height :18px;
							color: rgb(7,17,27);
						}
						.delivery{
							font-size :12px;
							color :rgb(147,153,159);
							margin-left :12px;
						}
					}
				}
			}
			.ratings-wrapper{
				padding :0 18px;
				.rating-item{
					padding :18px 0;
					.border-1px(rgba(7, 17, 27, 0.1));
					display :flex;
					.avatar{
						width: 28px;
						height: 28px;
						flex :0 0 28px;
						margin-right :12px;
						img{
							border-radius :50%;
						}
					}
					.content{
						flex:1;
						position :relative;
						.name{
							font-size :10px;
							color :rgb(7,17,27);
							line-height :12px;
						}
						.star-wrapper{
							font-size :0;
							.star{
								display :inline-block;
								margin-right :6px;
							}
							.delivery{
								display :inline-block;
								font-size :10px;
								font-weight:800;
								color :rgb(147,153,159);
								line-height :12px;
							}
						}
						.text{
							font-size :12px;
							color: rgb(7, 17, 27);
							line-height :18px;
							margin-bottom :8px;
							margin-top :6px;
						}
						.recommend{
							font-size :0;
							.icon-thumb_up{
								color :rgb(0,160,220);
								font-size :12px;
								line-height :16px;
							}
							.item{
								display :inline-block;
								border :1px solid  rgba(7,17,27,0.1);
								color: rgb(147,153,159);
								border-radius :2px;
								background-color :#fff;
								font-size :9px;
								line-height :16px;
								margin-left :8px;
								padding :0 6px;
								margin-bottom :4px;
							}
						}
						.time{
							position :absolute;
							right:0;
							top:0;
							font-size :10px;
							color :rgb(7,17,27);
							font-weight :200;
						}
					}
				}
			}
		}
	}
</style>

