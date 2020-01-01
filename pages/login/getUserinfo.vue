<template>
	<view class="getuser_page">
		<image src="https://sgz.wdttsh.com/mini_static/cut/logo.png" mode=""></image>
		<view class="get_title">天天生活</view>
		<view class="get_info">申请获取你的公开信息 (昵称、头像等)</view>
		<button open-type="getUserInfo" @getuserinfo="getUserInfo"> 授权登录 </button>
	</view>
</template>

<script>
	import {LoginModel} from '../../common/models/login.js'
	let loginModel = new LoginModel();
	import {mapMutations} from "vuex"
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			...mapMutations(['login']),
			getUserInfo(){
				var that = this;
				uni.getProvider({
					service: 'oauth',
					success: function (res) {
						if (~res.provider.indexOf('weixin')) {
							uni.login({
							  provider: 'weixin',
							  success: function (loginRes) {
								console.log(loginRes);
								uni.request({
									url:'https://sgz.wdttsh.com/app/wechat/getOpenId',
									data:{
										code:loginRes.code
									},
									method:'POST',
									header: {
										'content-type':'application/x-www-form-urlencoded'		 
									},
									success(res){
										
										if(res.data.resultCode == 6){
											uni.getUserInfo({
												provider: 'weixin',
												success: function (infoRes) {
													console.log(infoRes.userInfo);
													let data = {}
													data.openId = res.data.data
													data.nickname = infoRes.userInfo.nickName;
													data.sex = infoRes.userInfo.gender;
													data.logoImg = infoRes.userInfo.avatarUrl;
													console.log(data)
													uni.navigateTo({
														url:'/pages/login/bindMobile?data=' + JSON.stringify(data)
													})
												}
											})		
										}else{
											console.log(res.data.data)
											that.login(res.data.data)
											that.tim.login({userID:res.data.data.appuserId,userSig:res.data.data.userSig})
											uni.navigateBack({
												delta:1
											})
										}
									}
								})
								
								
								// loginModel.getOpenId({code:loginRes.code},(data)=>{
								// 	console.log(data)
								// 	// 获取用户信息
								// 	uni.getUserInfo({
								// 		provider: 'weixin',
								// 		success: function (infoRes) {
								// 		console.log(infoRes.userInfo);
								// 		
								// 		data.nickname = infoRes.userInfo.nickName;
								// 		data.sex = infoRes.userInfo.gender;
								// 		data.logoImg = infoRes.userInfo.avatarUrl;
								// 		
								// 		uni.setStorageSync('sessionkey',data.sessionkey);
								// 		console.log(uni.getStorageSync('sessionkey'));
								// 		that.login(data)
								// 		
								// 		uni.navigateBack({
								// 			delta:1
								// 		})
								// 	  }
								// 	});
								// })
								
							  }
							});
						}
					}
				});
			},
			getPhoneNumber(e) {
			    var that = this;
			    console.log(e.detail.errMsg == "getPhoneNumber:ok");
			    if (e.detail.errMsg == "getPhoneNumber:ok") {
					console.log(e.detail);
					let encryptedData = e.detail.encryptedData;
					let iv = e.detail.iv;
					let sessionkey = uni.getStorageSync('sessionkey');
					loginModel.getUserPhone(encryptedData,iv,sessionkey,(res)=>{
						console.log(JSON.parse(res));
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
