<template>
	<view>
		<view class="goodsInfo">
			<image :src="data.specsList[index].specsPicture"></image>
			<view class="container">
				<view class="con-title">{{data.title}}</view>
				<view class="con-spec">{{data.specsList[index].specsName}}</view>
				<view class="con-price">￥{{data.specsList[index].specsPrice}}</view>
			</view>
		</view>
		
		<view class="graytitle">基本信息</view>
		
		<view class="boxContainer">
			<view class="box" style="border-radius: 30rpx 30rpx 0 0;">
				<view class="star lf">姓名</view>
				<view class="rg">
					<input placeholder="请输入姓名" v-model="name"/>
				</view>
			</view>
			<view class="box">
				<view class="star lf">性别</view>
				<view class="rg">
					<view class="sex" :class="{'on':female}" @tap="chooseFemale">女</view>
					<view class="sex" :class="{'on':male}" @tap="chooseMale">男</view>
				</view>
			</view>
			<view class="box">
				<view class="star lf">联系电话</view>
				<view class="rg">
					<input placeholder="请输入手机号" v-model="phone"/>
				</view>
			</view>
			<view class="box">
				<view class="star lf">身份证号</view>
				<view class="rg">
					<input placeholder="请输入身份证" v-model="idenNo"/>
				</view>
			</view>
			<view class="box">
				<view class="star lf">公司名称</view>
				<view class="rg">
					<input placeholder="请输入公司名称" v-model="company"/>
				</view>
			</view>
			<view class="box" style="border-radius: 0 0 30rpx 30rpx;">
				<view class="star lf">公司地址</view>
				<view class="rg">
					<input placeholder="请输入公司地址" v-model="address"/>
				</view>
			</view>
		</view>
		
		
		<view class="uploadId">
			<view class="star">上传身份证</view>
			<view class="upload">
				<view class="id">
					<image :src="positiveImg" @tap="chooseImg(1)"></image>
					<view class="gray">身份证正面</view>
				</view>
				<view class="id nagative">
					<image :src="nagativeImg" @tap="chooseImg(2)"></image>
					<view class="gray">身份证反面</view>
				</view>
			</view>
		</view>
		<view class="uploadBusiness">
			<view class="star">上传营业执照</view>
			<view class="image"><image :src="business" @tap="chooseImg(3)"></image></view>
			
		</view>
		
		
		<view class="timepicker">
			<view class="star title">合同时长</view>
			<view class="choose">
				<view class="startDate">
					<picker mode="date" :start="startday" @change="startdateChange">
						<view class="sdate">{{startDate}}</view>
					</picker>
				</view>
				<view>至</view>
				<view class="endDate">
					<picker mode="date" :start="endday" @change="enddateChange">
						<view class="sdate">{{endDate}}</view>
					</picker>
				</view>
				<image src="/static/cut/grayright.png"></image>
			</view>
		</view>
		
		
		
		<view class="confirm">
			<view class="tips">
				<view class="star">签约合同事项确认</view>
				<image :src="[isContract?src[1]:src[0]]" @tap="conformToast"></image>
			</view>
			<view class="confirm-text">请仔细阅读并确认租聘合同事项哦~<text @tap="toContract">点击查看合同</text></view>
		</view>
		
		<view class="alert">注：确认签约后待商家同意签约，再支付款项</view>
		<view class="submit-button" @tap="confirm">确认办理</view>
	</view>
</template>

<script>
import {FinanceModel} from '@/common/models/finance.js'
const financemodel = new FinanceModel()
export default{
	data(){
		return{
			name:'',
			male:true,
			female:false,
			phone:'',
			idenNo:'',
			company:'',
			address:'',
			data:'',
			index:'',
			src:['/static/cut/no_selected.png','/static/cut/selected.png'],
			isContract:false,
			startDate:'请选择开始日期',
			endDate:'请选择结束日期',
			startday:'',
			endday:'',
			positiveImg:'https://sgz.wdttsh.com/mini_static/cut/upload_idcard.png',
			nagativeImg:'https://sgz.wdttsh.com/mini_static/cut/upload_idcard.png',
			business:'https://sgz.wdttsh.com/mini_static/cut/upload_idcard.png',
			type:'',
		}
	},
	onLoad(options){
		this.data = JSON.parse(options.data)
		console.log(this.data)
		this.index = options.index
	},
	methods:{
		chooseFemale(){
			this.male = false
			this.female = true
		},
		chooseMale(){
			this.male = true
			this.female = false
		},
		conformToast(){
			if(this.isContract == 0){
				uni.showToast({
					title:'请先阅读租聘合同再做确认',
					icon:'none'
				})
			}else{
				
			}
		},
		chooseImg(type){
			uni.chooseImage({
				count:1,
				success:(res)=>{
					console.log(this.type)
					let req = {img:res.tempFilePaths}
					uni.uploadFile({
						url: 'https://sgz.wdttsh.com/app/imgUpload/upload', 
						filePath: res.tempFilePaths[0],
						name: 'img',
						success: (uploadFileRes) => {
							let img = uploadFileRes.data;
							img = JSON.parse(img)
							if(type==1){
								console.log(type)
								this.positiveImg = img.data
							}else if(type==2){
								this.nagativeImg = img.data
							}else if(type==3){
								this.business = img.data
							}
						}
					})
				}
			})
		},
		toContract(){
			uni.navigateTo({
				url:`/pages/house/housecontract?type=金融&code=${this.data.financeCode}` 
			})
		},
		getCurrentDate(){
			const date = new Date();
			const year = date.getFullYear();
			const month = date.getMonth() + 1;
			const day = date.getDate();
			this.starday = year + '-' + month + '-' + day
			const endYear = year + 1
			this.endday = endYear + '-' + month + '-' + day
			console.log(this.endday)
			
		},
		startdateChange(e){
			this.startDate = e.target.value
		},
		enddateChange(e){
			this.endDate = e.target.value
		},
		confirm(){
			if(this.name==''){
				uni.showToast({
					title:'请输入姓名',
					icon:'none'
				})
				return
			}
			if(!(/^1[3456789]\d{9}$/.test(this.phone))){
				uni.showToast({
					title:'请输入正确的手机号码',
					icon:'none'
				})
				return
			}
			if(this.idenNo==''){
				uni.showToast({
					title: '请输入身份证号码',
					icon:'none'
				})
				return
			}
			if(this.company == ''){
				uni.showToast({
					title:'请输入公司名称',
					icon:'none'
				})
				return
			}
			if(this.address == ''){
				uni.showToast({
					title:'请输入公司地址',
					'icon':'none'
				})
				return
			}
			if(!this.positiveImg.startsWith('http')){
				uni.showToast({
					title:'请上传身份证正面照',
					icon:'none',
					duration:1500
				})
				return
			}
			if(!this.nagativeImg.startsWith('http')){
				uni.showToast({
					title:'请上传身份证反面照',
					icon:'none',
					duration:1500
				})
				return
			}
			if(!this.business.startsWith('http')){
				uni.showToast({
					title:'请上传营业执照',
					icon:'none',
					duration:1500
				})
				return
			}
			let req = {}
			req.name = this.name	
			if(this.male==1){
				req.gender = 1
			}else{
				req.gender = 0
			}
			req.name = this.name
			req.signingStartTime = this.startDate
			req.signingEndTime = this.endDate
			req.sellerId = this.data.sellerId
			req.confirmContract = 1
			req.companyAddress = this.address
			req.identityCard = this.idenNo
			req.companyName = this.company
			req.telephone = this.phone
			req.specsId = this.data.specsList[this.index].specsId
			req.financeCode = this.data.financeCode
			req.orderType = 1
			req.idPicture = this.positiveImg + ',' + this.nagativeImg
			req.businessLicense = this.business
			req = JSON.stringify(req)
			financemodel.signFinance({signingFinanceJson:req},(data)=>{
				uni.redirectTo({
					url:`/pages/success/success?type=5`
				})
			})
		}
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
	padding-bottom: 100rpx;
}
.timepicker{
	border-radius: 30rpx;
	height:84rpx;
	background-color: #fff;
	margin-top: 20rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.title{
		padding-left:20rpx;
		width:300rpx;
	}
	.choose{
		display: flex;
		width:450rpx;
		justify-content:space-around;
		align-items: center;
		image{
			width:10rpx;
			height:20rpx;
		}
		.sdate{
			font-size:28rpx;
			color:#1E1E1E;
		}
	}
}
.goodsInfo{
	border-radius: 0 0 30rpx 30rpx;
	height:220rpx;
	background-color: #fff;
	padding:30rpx;
	display: flex;
	image{
		width:160rpx;
		height:160rpx;
		border-radius:10rpx;
	}
	.container{
		display: flex;
		width:550rpx;
		margin-left: 10rpx;
		flex-direction: column;
		justify-content: space-between;
		.con-title{
			font-size:30rpx;
			color:#1E1E1E;
		}
		.con-spec{
			font-size:26rpx;
			color:#008AFF;
		}
		.con-price{
			color:#1E1E1E;
			font-weight: 700;
		}
	}
}



.boxContainer{
	border-radius: 30rpx;
}

.box{
	height:84rpx;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1rpx solid #f2f2f2;
	.lf{
		margin-left: 20rpx;
	}
	.rg{
		margin-right: 20rpx;
		display: flex;
		input{
			text-align: right;
		}
		.sex{
			width:60rpx;
			height:36rpx;
			border:1rpx solid rgba(255,102,0,1);
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.on{
			background-color: #ff6600;
			color:#fff;
		}
	}
}
.sign{
	margin:20rpx 0;
}

.contract{
	height:208rpx;
	background-color: #fff;
}

.confirm{
	border-radius: 30rpx;
	width:100%;
	height:208rpx;
	background-color: #fff;
	margin: 20rpx 0;
	padding: 0 20rpx;
	.tips{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height:82rpx;
		border-bottom: 1rpx solid #f2f2f2;
		image{
			width:28rpx;
			height:28rpx;
		}
	}
	.confirm-text{
		text-align: center;
		color:#1e1e1e;
		font-size:28rpx;
		margin-top: 39rpx;
		text{
			color:#FF6600;
		}
	}
}


.uploadId{
	border-radius: 30rpx;
	margin-top: 20rpx;
	width:750rpx;
	height:412rpx;
	background-color: #fff;
	padding:0 20rpx;
	.upload{
		display: flex;
		.id{
			width:340rpx;
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			flex-direction: column;
		}
		.nagative{
			margin-left: 30rpx;
		}
	}
}
image{
	width:340rpx;
	height:220rpx;
}
.star{
		height:82rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #F2F2F2;
	}

.uploadBusiness{
	border-radius: 30rpx;
	margin-top: 20rpx;
	height:373rpx;
	width:750rpx;
	background-color: #fff;
	padding:0 20rpx;
	.image{
		width:710rpx;
		height:290rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
.alert{
	color:#FF0000;
	display: flex;
	justify-content: center;
	margin: 20rpx 0;
}
</style>
