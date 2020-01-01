<template name="provideTitle">
	<view class="box">
		<view class="top">
			<view class="price"><text>￥{{price}}</text></view>
			<!-- <view class="share">
				<image src="/static/cut/share.png"></image>
				分享
			</view> -->
		</view>
		<view class="middle">
			{{title}}
		</view>
		<view class="bottom">
			<view class="common">{{spec}}</view>
			<view class="common">{{sale}}</view>
			<view class="common">{{disc}}</view>
		</view>
	</view>
</template>

<script>
export default {
	name:'provideTitle',
	props:{
		price:{
			type:String,
			value:''
		},
		title:{
			type:String,
			value:''
		},
		spec:{
			type:String,
			value:''
		},
		disc:{
			type:String,
			value:''
		},
		sale:{
			type:String,
			value:''
		}
	},
	data() {
		return {
			
		};
	}
}
</script>

<style lang="scss">
.box{
	background-color: #fff;
	width:750rpx;
	height:214rpx;
	padding:0 20rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	.top{
		display: flex;
		justify-content: space-between;
		.price{
			text{
				color:#FF6600;
				font-size:36rpx;
				margin:0 !important;
			}
		}
		.share{
			display: flex;
			justify-content: center;
			align-items: center;
			width:114rpx;
			height:40rpx;
			background:rgba(240,240,240,1);
			border-radius:20rpx 0rpx 0rpx 20rpx;
			font-size:24rpx;
			font-weight:400;
			color:rgba(180,180,180,1);
			line-height:40rpx;
			image{
				width:24rpx;
				height:24rpx
			}
			
		}
	}
	.middle{
		font-size:30rpx;
		font-weight:500;
		color:rgba(60,60,60,1);
		line-height:40rpx;
	}
	.bottom{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.common{
			font-size:24rpx;
			font-weight:400;
			color:rgba(160,160,160,1);
			line-height:36rpx;
		}
	}
}
</style>
