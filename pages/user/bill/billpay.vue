<template>
	<view>
		<view class="box">
			<view class="title">{{item.title}}</view>
			<view class="item" v-for="(data,index) in item.costList" :key="index">
				<view>{{data.costName}}</view>
				<view>￥{{data.costPrice}}</view>
			</view>
			<view class="price">
				应缴金额:<text>￥{{item.sum}}</text>
			</view>
		</view>
		
		<view @tap="toPay" class="submit-button">确认支付￥{{item.sum}}</view>
	</view>
</template>

<script>
	import {PayModel} from '@/common/models/pay.js'
	const paymodel = new PayModel()
	export default{
		data(){
			return{
				item:''
			}
		},
		onLoad(options) {
			this.item = JSON.parse(options.data)
			console.log(this.item)
		},
		methods:{
			toPay(){
				paymodel.tenpayPayOrder({outTradeNo:this.item.billCode},data=>{
					
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f2f2f2;
	}
	
	.box{
		background-color: #fff;
		padding: 0 20rpx;
		margin-top: 20rpx;
		.title{
			font-size:28rpx;
			color:rgba(60,60,60,1);
		}
		.item{
			display: flex;
			align-items: center;
			margin-top:20rpx;
			font-size:24rpx;
			color:rgba(100,100,100,1);
		}
		.price{
			margin-top: 20rpx;
			border-top: 1rpx solid #f2f2f2;
			height:100rpx;
			color:#A0A0A0;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			text{
				color:#FF6600;
			}
		}
	}
</style>
