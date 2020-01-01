<template>
	<view>
		<view v-if="type==1">
			<image src="https://sgz.wdttsh.com/mini_static/cut/vipcardok.png"></image>
			<view class="title">会员卡办理成功</view>
			<view class="whiteButton" @tap="toIndex">返回首页</view>
			<view class="yellowButton" @tap="toMyPackage">我的卡包</view>
		</view>
		<view v-if="type==2">
			<image src="https://sgz.wdttsh.com/mini_static/cut/pay_ok.png"></image>
			<view class="title">您已单方签约成功</view>
			<view class="content">等待商家签约完成后，再支付租房费用</view>
			<view class="whiteButton one" @tap="toIndex">返回首页</view>
			<view class="whiteButton two" @tap="toMyPackage">我的订单</view>
		</view>
		<view v-if="type==3">
			<image src="https://sgz.wdttsh.com/mini_static/cut/pay_ok.png"></image>
			<view class="payTitle">支付成功</view>
			<view class="whiteButton" @tap="toIndex">返回首页</view>
			<view class="yellowButton" @tap="toMyPackage">我的订单</view>
		</view>
		<view v-if="type==4">
			<image src="https://sgz.wdttsh.com/mini_static/cut/pay_ok.png"></image>
			<view class="payTitle">预约成功</view>
			<view class="whiteButton" @tap="toIndex">返回首页</view>
			<view class="yellowButton" @tap="toMyPackage">我的订单</view>
		</view>
		<view v-if="type==5">
			<image src="https://sgz.wdttsh.com/mini_static/cut/pay_ok.png"></image>
			<view class="payTitle">签约成功</view>
			<view class="whiteButton" @tap="toIndex">返回首页</view>
			<view class="yellowButton" @tap="toMyPackage">我的订单</view>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return {
			type:null
		}
	},
	onLoad(e) {
		this.type=e.type
		console.log(e)
	},
	methods:{
		toIndex(){
			uni.switchTab({
				url:'/pages/index/index'
			})
		},
		toMyPackage(){
			switch(Number(this.type)){
				case 1:
				uni.navigateTo({
					url:'../user/card/cardpackage'
				})
				break;
				case 2:
				uni.switchTab({
					url:'/pages/order/order?index=' + 2
				})
				break;
				case 3:
				uni.switchTab({
					url:'/pages/order/order?index=' + 2
				})
				break;
				case 4:
				uni.switchTab({
					url:'/pages/order/order?index=' + 2
				})
				break;
				case 5:
				uni.switchTab({
					url:'/pages/order/order?index=' + 2
				})
				break;
			}
		}
	}
}
</script>

<style lang="scss">
image{
	width:271rpx;
	height:243rpx;
	position: absolute;
	top:179rpx;
	left:240rpx;
}
.whiteButton{
	position: absolute;
	top:536rpx;
	left: 115rpx;
	width:240rpx !important;
}
.yellowButton{
	position:absolute;
	top:536rpx;
	left:395rpx;
	width:240rpx !important;
}
.one{
	position: absolute;
	top:583rpx;
	left: 115rpx;
	width:240rpx !important;
}
.two{
	position:absolute;
	top:583rpx;
	left:395rpx;
	width:240rpx !important;
}
.title{
	position:absolute;
	top:448rpx;
	left:264rpx;
	font-size:30rpx;
	color:rgba(100,100,100,1);
}
.content{
	position:absolute;
	top:508rpx;
	left:160rpx;
	color:#8C8C8C;
}
.payTitle{
	position:absolute;
	top:456rpx;
	left:305rpx;
	font-size:36rpx;
	color:rgba(60,60,60,1);
}
</style>
