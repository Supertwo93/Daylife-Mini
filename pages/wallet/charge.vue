<template>
	<view>
		<view class="accountNumber">
			<view class="title">充值金额</view>
			<view class="number">
				<view class="renmibi">￥</view>
				<input type="digit" v-model="number" @input="checkChange"/>
				<image src="/static/cut/cancel.png" @tap="clearNumber()"></image>
			</view>
		</view>
		
		<!-- <view class="typeTitle">充值方式</view>
		
		<view class="chargeType">
			<view>
				<image class="pay" src="/static/cut/wechat.png"></image>
				<view>微信充值</view>
				<image v-if="wxPay==0" class="icon" src="/static/cut/unchoose.png"></image>
				<image v-if="wxPay==1" class="icon" src="/static/cut/choosed.png"></image>
			</view>
			<view>
				<image class="pay" src="/static/cut/alipay.png"></image>
				<view>支付宝充值</view>
				<image v-if="aliPay==0" class="icon" src="/static/cut/unchoose.png"></image>
				<image v-if="aliPay==1" class="icon" src="/static/cut/choosed.png"></image>
			</view>
		</view> -->
		
		<view v-if="number=='' || isOver==1" class="submit-button noNumber"> 确认充值</view>
		<view v-if="number!='' && isOver==0" class="submit-button" @tap="next()">确认充值</view>
	</view>
</template>

<script>
	import {UserModel} from '../../common/models/user.js'
	let usermodel = new UserModel();
	export default{
		data(){
			return{
				wxPay:0,
				aliPay:0,
				number:"",
				isOver: 0	//是否超过 0：没超过   1：超过
			}
		},
		filters: {
			toFixed:function(x) {
				return parseFloat(x).toFixed(2);
			}
		},
		onLoad() {
			
		},
		methods:{
			checkChange(e){
				this.number = this.number.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
			},
			clearNumber(){
				this.number = '';
			},
			next(){
				usermodel.userRecharge({
					rechargeMoney: this.number
				},(res)=>{
					console.log(res);
					uni.requestPayment({
					    provider: 'wxpay',
					    timeStamp: res.timeStamp,
					    nonceStr: res.nonceStr,
					    package: res.package,
					    signType: 'MD5',
					    paySign: res.paySign,
					    success: function (res) {
					    	uni.showToast({
					    		title: "支付成功！"
					    	})
					    },
					    fail: function (err) {
					    	uni.showToast({
					    		title:'您已取消支付，请尽快完成支付',
					    		duration:2000,
					    		icon:'none'
					    	})
					    }
					});
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}
.accountNumber{
	margin-top:20rpx;
	height:242rpx;
	background-color: #fff;
	.title{
		height:54rpx;
		padding-top:29rpx;
		padding-left:19rpx;
		font-size:26rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(100,100,100,1);
		line-height:36rpx;
	}
	.number{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height:188rpx;
		.renmibi{
			width:37rpx;
			height:45rpx;
			margin-right:28rpx;
			margin-left:20rpx;
			font-size:60rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(60,60,60,1);
			margin-bottom:40rpx;
		}
		input{
			width:600rpx;
			font-size:68rpx;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(60,60,60,1);
			min-height: 68rpx;
		}
		image{
			width:44rpx;
			height:44rpx;
			margin-right:20rpx;
		}
	}
}

.typeTitle{
	height:63rpx;
	margin-top:19rpx;
	margin-left:20rpx;
}

.chargeType{
	view{
		height:100rpx;
		background-color: #fff;
		display: flex;
		align-items:center;
		border-bottom:1px solid #f2f2f2;
		.pay{
			width:60rpx;
			height:60rpx;
			margin-left: 20rpx;
		}
		.icon{
			width:28rpx;
			height:28rpx;
		}
		view{
			margin-left:20rpx;
			width:580rpx;
		}
	}
}

.noNumber{
	background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
	opacity:0.6;
}




</style>
