<template name="itemService">
	<view class="item">
		<view class="lf">
			<image class="goodImg" :src="src"></image>
		</view>
		<view class="rg">
			<view class="topBox">
				<view class="title">{{title}}</view>
				
			</view>
			<view class="middle">
				<view v-if="isHouse==0" class="gray-box">
					<text v-if="isVIP==0">已接单{{monthSale}}</text>
					<text v-if="isVIP==1">已办理人数{{monthSale}}</text>
				</view>
				<view v-if="isHouse==1" class="gray-box">面积{{desc}}</view>
			</view>
			<view class="bottom">
				<view class="money">
					<view class="number">
						<block v-if="type==1">
							<text>免费办理</text>
						</block>
						<block v-else>
							<text> ￥{{money}}</text>
						</block>
					</view>
				</view>
				<view class="distance">{{distance}}km</view>
				<!-- <view class="desc">{{desc}}</view> -->
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name:'itemService',
	props:{
		title:{             //标题
			type:String,
			value:'NONE'
		},
		distance:{         //商家距离
			type:String,
			value:''
		},
		money:{
			type:String,
			value:''
		},
		desc:{           //销量 楼层等
			type:String,
			value:''
		},
		src:{             //图片地址
			type:String,
			value:''
		},
		type:{             //会员卡类型
			type:String,
			value:''
		},
		monthSale:{
			type:String,
			value:''
		},
		isHouse:{
			type:Boolean,
			value:false
		},
		isVIP:{
			type:Boolean,
			value:false
		}
		
	},
	data() {
		return {
			
		};
	}
}
</script>

<style lang="scss">
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
		.topBox{
			.title{
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				word-wrap: break-word;
				word-break: break-all;
				font-size:30rpx;
				font-weight:400;
				color:#1e1e1e;
			}
		}
		.middle{
			display: flex;
			.gray-box{
				background:rgba(255,255,255,1);
				border:1rpx solid rgba(160,160,160,1);
				border-radius:6rpx;
				font-size:22rpx;
				height:30rpx;
				line-height: 30rpx;
				padding:0 5rpx;
				color:rgba(140,140,140,1);
			}
		}
		.bottom{
			display: flex;
			align-items: center;
			.money{
				width:150rpx;
				margin-right: 120rpx;
				display: flex;
				align-items: flex-end;
				.number{
					text{
						font-size: 34rpx;
						color:#FF6600;
					}
				}
			}
			.distance{
				font-size:26rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(140,140,140,1);
			}
			// .desc{
			// 	margin-left: 200rpx;
			// 	font-size:22rpx;
			// 	color:rgba(180,180,180,1);
			// }
		}
	}
}
</style>
