<script>
	import {LoginModel} from "@/common/models/login.js"
	let loginModel=new LoginModel()
	import {mapMutations} from "vuex"
	export default {
		methods: {
			...mapMutations(['login'])
		},
		onLaunch: function() {
			let uerInfo = uni.getStorageSync('uerInfo') || '';
			if(uerInfo.appuserId){ 
				//更新登陆状态
				uni.getStorage({
					key: 'uerInfo',
					success: (res) => {
						this.login(res.data);
						this.tim.login({userID:res.data.appuserId,userSig:res.data.userSig})
					}
				});
			}
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import 'static/font/iconfont.css';
	/*每个页面公共css */
	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video {
		box-sizing: border-box;
	}
	button::after{ border: none;}
	button{
		margin: 0;
		padding: 0;
		outline: none;    //消除默认点击蓝色边框效果
		background: none;
	}
	body{
		font-family:'Source Han Sans CN';
		font-size: 26rpx;
		color: #3C3C3C;
	}
	//文字省略
	.ellipsis{
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	// 橙色 主题按钮颜色
	.theme-button{
		display: flex;
		align-items: center;
		justify-content: center;
		color:rgba(255,255,255,1);
		background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
		border-radius:10rpx;
	}

	// 橙色 主题按钮颜色反色
	.theme-button-inverse{
		line-height: 60rpx;
		border:1px solid rgba(255,102,0,1);
		text-align: center;
		color: #FF6600;
		border-radius:10rpx;
		font-weight:400;
	}
	//黄色 主题按钮颜色
	.them-yellow-btton{
		line-height: 60rpx;
		color:rgba(255,255,255,1);
		font-weight:400;
		text-align: center;
		background:linear-gradient(-90deg,rgba(255,180,0,1),rgba(250,226,67,1));
		border-radius:10px;
	}
	
	
	//底部提交长条按钮
	.submit-button{
		width:100%;
		height:96rpx;
		background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
		position:fixed;
		bottom:0;
		text-align: center;
		font-size:34rpx;
		line-height:96rpx;
		font-weight:400;
		color:rgba(255,255,255,1);
		z-index:99
	}
	
	//星星
	.star::before { content: "*"; color: #FF0000;} 
	
	//长按钮
	.long-button{
		margin-left:20rpx;
		margin-right:20rpx;
		width:710rpx;
		height:70rpx;
		background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
		border-radius:8rpx;
		font-size:30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
	
	//列表格式化
	.topContainer{
		background-color: #fff;
		.container{
			height:105rpx;
			border-bottom:1rpx solid #EBEBEB;
			margin:0 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size:26rpx;
			font-weight:400;
			color:rgba(60,60,60,1);
		}
	}
	
	//列表前标题说明
	.defaultTitle{
		width:100%;
		height:63rpx;
		padding:20rpx 0 20rpx 20rpx;
		font-size:24rpx;
		font-weight:400;
		color:rgba(160,160,160,1);
	}
	
	
	
	.store{
		width:100%;
		height:160rpx;
		background-color: #fff;
		padding:30rpx 20rpx;
		display: flex;
		margin: 10rpx 0;
		.storeImg{
			width:100rpx;
			height:100rpx;
		}
		.rt{
			width:580rpx;
			margin-left: 20rpx;
			height:100rpx;
			.storeName{
				align-items: center;
				display: flex;
				view{
					font-size:32rpx;
					color:rgba(60,60,60,1);
				}
				image{
					width:24rpx;
					height:24rpx;
				}
			}
			.stars{
				margin-top: 10rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.starlf{
					display: flex;
					align-items: center;
					image{
						margin-right: 7rpx;
						width:24rpx;
						height:25rpx;
					}
					view{
						font-size:26rpx;
						color:#FFC600;
					}
				}
				.starrt{
					display: flex;
					.phone{
						display: flex;
						align-items: center;
						justify-content: center;
						width:136rpx;
						height:50rpx;
						border:1rpx solid rgba(255,102,0,1);
						border-radius:25rpx;
						color:#FF6600;
					}
					.into{
						display: flex;
						align-items: center;
						justify-content: center;
						margin-left: 10rpx;
						width:136rpx;
						height:50rpx;
						background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
						border-radius:25rpx;
						color:#fff;
					}
				}
				
			}
		}
	}
	
	
	.whiteButton{
		width:160rpx;
		height:60rpx;
		background:rgba(255,255,255,1);
		border:1rpx solid rgba(255,102,0,1);
		border-radius:10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size:26rpx;
		font-weight:400;
		color:rgba(255,102,0,1);
	}
	
	.yellowButton{
		width:160rpx;
		height:60rpx;
		border:1rpx solid rgba(255,102,0,1);
		background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
		border-radius:10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size:26rpx;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
	
	.agreementButton{
		width:710rpx;
		height:220rpx;
		border-radius:10rpx;
		position:relative;
		margin-left: 20rpx;
		margin-top: 40rpx;
		image{
			width:88rpx;
			height:88rpx;
			position: absolute;
			top:66rpx;
			left:40rpx;
		}
		.title{
			font-size:30rpx;
			font-weight:500;
			line-height:36rpx;
			position: absolute;
			top:76rpx;
			left:148rpx;
		}
		.content{
			font-size:24rpx;
			font-weight:400;
			line-height:36rpx;
			position: absolute;
			top:120rpx;
			left:148rpx;
		}
		
	}
	
	//灰色字体
	.gray{
		font-size:24rpx;
		color:#787878;
	}
	
	.graytitle{
		height:60rpx;
		margin-left: 20rpx;
		font-size:22rpx;
		color:rgba(120,120,120,1);
		line-height:60rpx;
	}
	
	.grayButton{
		margin-top: 10rpx;
		height:58rpx;
		padding:0 30rpx 0 30rpx;
		line-height: 58rpx;
		background-color: #F0F0F0;
		border-radius:10px;
		margin-right: 19rpx;
	}
	
	//首页筛选样式
	.indexChooseType{
		height:84rpx;
		background-color: #fff;
		padding: 0 20rpx;
		border-radius: 0 0 30rpx 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.title{
			padding-left:10rpx;
			display: flex;
			align-items: center;
			.title-border{
				margin-right: 13rpx;
				width:8rpx;
				height:30rpx;
				background:rgba(255,102,0,1);
			}
			.title-content{
				font-size:34rpx;
				font-weight:bold;
				color:rgba(30,30,30,1);
			}
		}
		.icon{
			display: flex;
			align-items: center;
			font-size:28rpx;
			font-weight:400;
			color:#FF6600;
			image{
				margin-left: 8rpx;
				width:18rpx;
				height:12rpx;
			}
		}
	}
	
	//店铺详情底部签约
	.bottomFix{
		position: fixed;
		bottom:0;
		width:100%;
		background-color: #fff;
		bottom:0;
		height:110rpx;
		display: flex;
		align-items: center;
		.collect{
			width:45rpx;
			margin-left: 34rpx;
			image{
				width:42rpx;
				height:35rpx;
			}
			view{
				font-size:22rpx;
				color:rgba(120,120,120,1);
			}
		}
		.contact{
			margin-left: 57rpx;
			width:45rpx;
			image{
				width:38rpx;
				height:38rpx;
			}
			view{
				font-size:22rpx;
				color:rgba(255,102,0,1);
			}
		}
		.theme-button{
			margin-left: 59rpx;
			height:70rpx;
			width:500rpx;
			border-radius: 35rpx;
		}
		.life-button{
			margin-left: 59rpx;
			display: flex;
			view{
				display: flex;
				align-items: center;
				justify-content: center;
				font-size:30rpx;
				color:#fff;
			}
			.left{
				width:250rpx;
				height:70rpx;
				background:linear-gradient(-90deg,rgba(255,180,0,1),rgba(250,226,67,1));
				border-radius:35rpx 0px 0px 35rpx;
			}
			.right{
				width:250rpx;
				height:70rpx;
				background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
				border-radius:0rpx 35rpx 35rpx 0px;
			}
		}
	}
	
	.hasLogin{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 330rpx;
		.title{
				margin:40rpx 0;
			}	
		.loginButton{
			width:160rpx;
			height:60rpx;
			background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
			border-radius:10rpx;
			color:#fff;
			display: flex;
			align-items: center;
			justify-content: center;
		}	
		image{
			width: 270rpx;
			height: 240rpx;
		}
	}
	
	.secondOn{
		background:rgba(255,241,232,1);
		border:1rpx solid rgba(255,102,0,1);
		border-radius:10rpx;
		height:58rpx;
		padding:0 30rpx 0 30rpx;
		line-height: 58rpx;
		margin-right: 19rpx;
		margin-top:10rpx;
	}
	
	.secondType{
		.typeContent{
			display: flex;
			margin-top:20rpx;
			padding-bottom: 20rpx;
			border-bottom: 1rpx solid #f2f2f2;
			flex-wrap: wrap;
			.grayButton{
				margin-bottom: 10rpx;
			}
		}
		.order{
			display: flex;
			margin-top:20rpx;
			padding-bottom: 20rpx;
			flex-wrap: wrap;
		}
		.button{
			width:100%;
			margin-top: 30rpx;
			height:70rpx;
			background: linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
			border-radius:10rpx;
			color:#fff;
			display: flex;
			justify-content: center;
			align-items:center;
		}
	}

</style>
