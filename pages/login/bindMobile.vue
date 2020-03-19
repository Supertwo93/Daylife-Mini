<template>
	<view class="getuser_page">
		<image src="https://sgz.wdttsh.com/mini_static/cut/logo.png" mode=""></image>
		<view class="get_title">天天生活</view>
		<view class="get_info">微信手机号一键注册登录</view>
		<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"> 获取手机号 </button>
	</view>
</template>

<script>
	import {LoginModel} from '../../common/models/login.js'
	let loginModel = new LoginModel();
	import {mapMutations} from "vuex"
	export default{
		data(){
			return{
				data:''
			}
		},
		onLoad(option){
			this.data = JSON.parse(option.data)
		},
		methods:{
			...mapMutations(['login']),
			getPhoneNumber(e) {
				console.log(e)
			    var that = this;
			    console.log(e.detail.errMsg == "getPhoneNumber:ok");
			    if (e.detail.errMsg == "getPhoneNumber:ok") {
					let req = {}
					req.encryptedData = e.detail.encryptedData;
					req.iv = e.detail.iv;
					req.openId = that.data.openId
					loginModel.getUserPhone(req,(res)=>{
						console.log(res)
						let request = {}
						request.openId = that.data.openId
						request.phone = res.phoneNumber
						request.logoImg = that.data.logoImg
						if(that.data.sex==1){
							request.sex = '男'
						}else{
							request.sex = '女'
						}
						request.nickname = that.data.nickname
						loginModel.bindPhone(request,data=>{
							that.login(data)
							// that.tim.login({userID:data.appuserId,userSig:data.userSig})
							uni.navigateBack({
								delta:2
							})
						})
					})
					// uni.navigateBack({
					// 	delta: 1
					// })
			    }
			}
		}
	}
</script>

<style lang="scss">
	.getuser_page{
		padding: 80rpx 30upx;
		box-sizing: border-box;
		overflow: hidden;
		text-align: center;
		image{
			display: block;
			width: 80rpx;
			height: 80rpx;
			margin: 0 auto 50rpx;
			border-radius: 50%;
		}
		.get_title{
			font-size: 34rpx;
			margin-bottom: 10rpx;
		}
		.get_info{
			font-size: 24rpx;
			color: #999;
			margin-bottom: 50rpx;
		}
		button{
			color: #fff;
			background: #FF9801;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 32rpx;
			margin-bottom: 10rpx;
		}
	}
</style>
