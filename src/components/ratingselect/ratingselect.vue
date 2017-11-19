<template>
	<div class="ratingselect">
		<div class="rating-type border-1px">
			<span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span><span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positive.length}}</span></span><span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
		</div>
		<div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
			<span class="icon-check_circle"></span>
			<span class="text">只看内容的评价</span>
		</div>
	</div>
</template>

<script>
	const POSITIVE=0;//部分
	const NEGATIVE=1;//没有
	const ALL=2;//全部
	export default{
		props:{
			ratings:{
				type:Array,
				default(){
					return []
				}
			},
			selectType:{
				type:Number,
				default(){
	                return ALL;
				}
			},
			onlyContent:{
				type:Boolean,
				default(){
	                return false;
				}
			},
			desc:{
				type:Object,
				default(){
					return{
						all:"全部",
						positive:'满意',
						negative:'不满意'
					}
				}
			}
		},
		methods:{
			select(type,event){
				if(!event._constructed){
					return
				}
				/*this.selectType=type;*/
				this.$emit('select',type);
			},
			toggleContent(event){
				if(!event._constructed){
					return
				}
				this.$emit("onlyContent",this.onlyContent);
			}
		},
		computed:{
			positive(){
				return this.ratings.filter((item)=>{
					return item.rateType===POSITIVE
				})
			},
			negative(){
				return this.ratings.filter((item)=>{
					return item.rateType===NEGATIVE
				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
@import "../../common/less/mixin.less";
	.ratingselect{
		.rating-type{
			padding:18px;
			margin:0 18px;
			.border-1px(rgba(7,17,27,0.1));
			.block{
				display: inline-block;
				padding:8px 12px;
				border-radius:1px;
				margin-right:8px;
				color:rgb(77,85,93);
				font-size: 12px;
				line-height: 16px;
				&.active{
					color: #fff;
				}
				.count{
					font-size: 8px;
					margin-left: 2px;
				}
				&.positive{
					background: rgba(0,160,220,0.2);
					&.active{
						background: rgb(0,160,220);
					}
				}
				&.negative{
					background: rgba(77,85,93,0.2);
					&.active{
						background: rgb(77,85,93);
					}
				}
			}
		}
		.switch{
			padding:12px 18px;
			line-height: 24px;
			border-bottom: 1px solid rgba(7,17,27,0.1);
			color: rgb(147,153,159);
			&.on{
				.icon-check_circle{
					color: #00c850;
				}
			}
			.icon-check_circle{
				display: inline-block;
				vertical-align: top;
				margin-right: 4px;
				font-size: 24px;
			}
			.text{
				display: inline-block;
				font-size: 12px;
				vertical-align: top;
			}
		}
	}
</style>


