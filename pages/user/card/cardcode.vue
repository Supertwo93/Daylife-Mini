<template>
	<view>
		<image class="icon" :src="data.logoPic"></image>
		<image class="code" :src="url"></image>
		<view class="number">{{data.cardNo}}</view>
		<view class="text">请出示会员支付码</view>
	</view>
	

</template>

<script>
	import {UserModel} from '@/common/models/user.js'
	const usermodel = new UserModel()
	export default{
		data(){
			return{
				id:'',
				url:'',
				data:''
			}
		},
		onLoad(options){
			this.id = options.id
			this.data = JSON.parse(options.data)
			usermodel.getQRCode({id:this.id},data=>{
				this.url = data
			})
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
.icon{
	position: absolute;
	width:100rpx;
	height:100rpx;
	border-radius:12rpx;
	top:192rpx;
	left:325rpx;
}
.code{
	position: absolute;
	width:350rpx;
	height:350rpx;
	top:374rpx;
	left:200rpx;
}
.number{
	position:absolute;
	width:264rpx;
	font-size:32rpx;
	font-weight:400;
	color:rgba(60,60,60,1);
	line-height:36rpx;
	top:785rpx;
	left:153rpx;
}
.text{
	position: absolute;
	width:224rpx;
	font-size:26rpx;
	font-weight:400;
	color:rgba(140,140,140,1);
	line-height:36rpx;
	top:829rpx;
	left:263rpx;
}
.scan{
	position:absolute;
	width:88rpx;
	height:88rpx;
	background:rgba(255,255,255,1);
	box-shadow:0rpx 4rpx 10rpx 0rpx rgba(0, 0, 0, 0.1);
	border-radius:50%;
	top:974rpx;
	left:331rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	image{
		width:38rpx;
		height:38rpx;
	}
}
</style>
