<template name="storeTitle">
	<view class="storeInfoCom">
		<view class="storeCom">
			<image class="storeIcon" src="https://sgz.wdttsh.com/mini_static/cut/black-store.png"></image>
			<view class="storetitle">{{title}}</view>
			<image class="arrow" src="https://sgz.wdttsh.com/mini_static/cut/black-arrow.png"></image>
		</view>
		<view class="status">{{typeText[status]}}</view>
	</view>
</template>

<script>
export default {
	name:'storeTitle',
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
		status:{
			type:String,
			value:''
		}
	},
	data() {
		return {
			typeText:{
				unpaid:'等待买家付款',
				unreceived:'等待商家接单',
				received:'商家已接单',
				deliver:'服务中',
				completed:'交易完成',
				refunds:'退款中',
				cancelled:'退款成功',
				serviced:'商家处理中',
				servicefinish:'售后完成',
				servicrefuse:'商家拒绝申请',
				drawdone:'售后完成',
				finished:'已完成',
				waiting:'等待商家签约',
				housefinished:'交易完成',
				houseback:'退租中'
			},
		};
	}
}
</script>

<style lang="scss" scoped>
.storeInfoCom{
	background-color: #fff;
	height:84rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.storeCom{
		display: flex;
		align-items: center;
		.storeIcon{
			width:26rpx;
			height:23rpx;
		}
		.storetitle{
			color:#1E1E1E;
			font-size: 28rpx;
			margin-left: 10rpx;
			font-weight: 700;
		}
		.arrow{
			margin-top: 2rpx;
			margin-left: 10rpx;
			width:8.5rpx;
			height:16.5rpx;
		}
	}
	.status{
		font-size:26rpx;
		color:#FF6600;
	}
}
</style>
