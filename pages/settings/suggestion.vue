<template>
	<view>
		<view class="explain">
			<view class="text1">感谢您对我们平台提出的宝贵意见，您的建议对我们</view>
			<view class="text2">非常重要，我们将积极采纳并做出调整和反馈</view>
		</view>
		
		<textarea v-model="data" placeholder="请输入您的宝贵意见" />
		<view class="choose-photo">选择图片</view>
		
		<view class="upload_img_box">
			<image class="upload_icon" v-if="hasUpload==0" :src="pictureSrc" @tap="selectPhoto"></image>
			<view v-if="hasUpload==1" class="image_item">
				<image class="img" :src="uploadSrc" ></image>
				<view class="del_icon" @tap.stop="deletePhoto"><image src="https://sgz.wdttsh.com/mini_static/cut/delete-icon.png" mode="widthFix"></image></view>
			</view>
		</view>
		
		<view @tap="submit" class="long-button">确认提交</view>
		
		
	</view>
</template>

<script>
	import {UserModel} from '@/common/models/user.js'
	const usermodel = new UserModel()
	export default{
		data(){
			return{
				data:'',
				pictureSrc:'https://sgz.wdttsh.com/mini_static/cut/upload_photo.png',
				hasUpload:false,
				uploadSrc:''
			}
		},
		methods:{
			selectPhoto(e){
				var that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						console.log(res.tempFilePaths);
						// console.log(res.tempFilePaths[i]);
						uni.uploadFile({
							url: 'https://sgz.wdttsh.com/app/imgUpload/upload', //图片接口
							filePath: res.tempFilePaths[0],
							name: 'img',
							success: (uploadFileRes) => {
								var data = JSON.parse(uploadFileRes.data);
								if(data.resultCode == 1){
									var url = data.data;
									that.uploadSrc = url
									that.hasUpload = true
								}else{
									uni.showToast({
										title:data.message,
										icon:'none',
									});
								}
							}
						});
					},
					fail: (res) => {
						uni.showToast({
							title:'上传失败',
							icon:'none',
						});
					}
				});
			},
			deletePhoto(){
				this.uploadSrc = ''
				this.hasUpload = false
			},
			submit(){
				if(this.data == ''){
					uni.showToast({
						title:'请输入建议内容',
						icon:'none',
						duration:1500
					})
					return
				}
				let req = {}
				req.content = this.data
				if(this.hasUpload == 1){
					req.img = this.uploadSrc
				}
				usermodel.addFeeBack(req,data=>{
					uni.showToast({
						title:'提交成功，感谢您的意见',
						icon:'none',
						duration:1500
					})
					setTimeout(()=>{
						uni.switchTab({
							url:'/pages/index/index'
						})
					},1500)
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}
.explain{
	height:145rpx;
	width:100%;
}
textarea{
	height:316rpx;
	width:100%;
	background-color: #fff;
	padding:20rpx;
}

.long-button{
	margin-top:100rpx;
}
.text{
	width:624px;
	font-size:26rpx;
	font-family:Source Han Sans CN;
	font-weight:400;
	// color:#ff6600;
	line-height:40rpx;
}

.choose-photo{
	margin-left: 10rpx;
	height:61rpx;
	line-height:61rpx;
}

.text1{
	margin:39rpx 63rpx 0 63rpx;
}

.text2{
	margin:0 0rpx 0 83rpx;
}

.upload_img_box{
	background-color: #fff;
	height:260rpx;
	padding:30rpx 0 0 20rpx;
	.upload_icon{
		width:200rpx;
		height:200rpx;
	}
	.image_item{
		border:1rpx solid #f2f2f2;
		box-sizing: border-box;
		position: relative;
		width:200rpx;
		height:200rpx;
		.img{
			display: block;
			width:200rpx;
			height:200rpx;
		}
		.del_icon{
			position: absolute;
			right:0;
			top:0;
			image{
				display: block;
				width:25rpx;
				height:25rpx;
			}
		}
	}
}

</style>
