<template name="itemList">
	<view class="item">
		<view class="lf">
			<image class="goodImg" :src="src"></image>
		</view>
		<view class="rg">
			<view class="toprg">
				<view class="title">{{title}}</view>				
			</view>
			<view class="middle">
				<view v-if="deliver!=0" class="deliver">配送费￥{{deliver}}</view>
				<view v-if="deliver==0" class="noDeliver">免配送费</view>
				<view class="deliver">月售{{sales}}</view>
			</view>
			<view class="bottom">
				<view class="money">
					<view class="icon"></view>
					<view class="number">￥{{money}}</view>
				</view>
				<view class="distance">距离{{distance}}km</view>
				<image src="https://sgz.wdttsh.com/mini_static/cut/car.png" class="cartImg" @tap.stop="childrenTap"></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name:'itemList',
	props:{
		title:{
			type:String,
			value:'NONE'
		},
		distance:{
			type:String,
			value:''
		},
		money:{
			type:Number,
			value:''
		},
		sales:{
			type:Number,
			value:''
		},
		deliver:{
			type:Number,
			value:''
		},
		src:{
			type:String,
			value:''
		}
		
	},
	data() {
		return {
			
		};
	},
	methods:{
		childrenTap(){
			this.$emit('addcart')
		}
	}
}
</script>

<style scoped lang="scss">
.item{
	border-radius: 30rpx;
	margin-top: 10rpx;
	width:750rpx;
	height:190rpx;
	background-color: #fff;
	padding:20rpx;
	display: flex;
	.lf{
		.goodImg{
			width:150rpx;
			height:150rpx;
			border-radius:10rpx;
		}
	}
	.rg{
		width:520rpx;
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.toprg{
			.title{
				font-size:30rpx;
				font-weight:400;
				color:#1e1e1e;
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				word-wrap: break-word;
				word-break: break-all;
			}
		}
		.middle{
			display: flex;
			.noDeliver{
				margin-right: 10rpx;
				font-size:22rpx;
				height:30rpx;
				line-height: 30rpx;
				padding:0 5rpx;
				color:rgba(255,102,0,1);
				border:1rpx solid rgba(255,102,0,1);
				border-radius:6rpx;
			}
			.deliver{
				margin-right:10rpx;
				font-size:22rpx;
				height:30rpx;
				line-height: 30rpx;
				padding:0 5rpx;
				color:rgba(160,160,160,1);
				border:1rpx solid rgba(160,160,160,1);
				border-radius:6rpx;
			}
		}
		.bottom{
			// margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			.money{
				display: flex;
				align-items: flex-end;
				.icon{
					font-size: 20rpx;
					color:#A0A0A0;
				}
				.number{
					font-size: 34rpx;
					color:#FF6600;
				}
			}
			.sales{
				font-size:22rpx;
				color:rgba(180,180,180,1);
			}
			.deliver{
				font-size:22rpx;
				color:rgba(180,180,180,1);
			}
			.noDeliver{
				font-size:22rpx;
				color:rgba(120,120,120,1);
			}
			image{
				width:56rpx;
				height:56rpx;
			}
		}
	}
}
</style>
