<template>
	<view>
		<!-- 收货地址 -->
		<view class="addr" @tap="selectAddress">
			<view class="icon">
				<image src="../../static/cut/address_on.png" mode=""></image>
			</view>
			<view class="right" v-if="recinfo.receiverName">
				<view class="tel-name">
					<view class="name">
						{{recinfo.receiverName}}
					</view>
					<view class="tel">
						{{recinfo.receiverPhone}}
					</view>
				</view>
				<view class="addres">
					{{recinfo.receiverProvince}} {{recinfo.receiverCity}} {{recinfo.receiverDistrict}}
					{{recinfo.receiverAddress}}
				</view>
			</view>
			<view class="item" v-else>还没添加地址，去<text>添加地址</text>吧~ </view>
		</view>
		
		<!-- 家政维修预约时间 -->
		<view v-if="firstTypeId==3||firstTypeId==9" class="appointment">
			<view class="item-name">预约时间</view>
			<hTimePicker interval="15" @changeTime="changeTime">
				<view slot="pCon" class="changeTime">
					{{appointment}}
					<image src="/static/cut/grayright.png"></image>
				</view>
			</hTimePicker>
		</view>
		
		
		<!-- 购买商品列表 -->
		<view class="itemList">
			<view class="row" v-for="(row,index) in buylist" :key="index">
				<view class="store">
					<image src="/static/cut/dpicon.png"></image>
					<view class="title">{{row.sellerName}}</view>
				</view>
				<view class="item" v-for="(item,number) in row.orderItemList" :key="number">
					<view class="imgContainer">
						<image :src="item.picPath"></image>
					</view>
					<view class="itemContainer">
						<view class="itemTop">
							<view class="title">{{item.title.substring(0,20) + '...'}}</view>
							<view class="money">{{item.price}}</view>
						</view>
						<view class="itemBottom">
							<view class="spec">{{item.spec}}</view>
							<view class="num">×{{item.num}}</view>
						</view>
					</view>
				</view>
				<view v-if="firstTypeId==8||firstTypeId==10" class="otherFee">
					<view class="title gray">配送(运费)</view>
					<view class="post">{{row.postFee}}</view>
				</view>
				<view v-if='id==10' class="otherFee">
					<view class="title gray">进口税</view>
					<view class="post">{{row.orderItemList[0].importPrice}}</view>
				</view>
				<view class="total">
					<view class="fee">合计：<text>￥{{row.payment}}</text></view>
				</view>
				<view class="remarks">
					<text>给卖家留言：</text> <input v-model="row.val" placeholder="请输入" />
				</view>
			</view>
		</view>

		<view @click="sub" class="submit-button">确认支付￥{{sumPrice}}</view>
		
	</view>
</template>

<script>
	import {AddressModel} from '@/common/models/address.js'
	let addressModel=new AddressModel()
	import {PayModel} from '@/common/models/pay.js'
	let payModel=new PayModel()
	import hTimePicker from '@/components/h-timePicker.vue'
	import {ConfirmationModel} from '@/common/models/confirmation.js'
	let confirmationModel = new ConfirmationModel()
	
	export default {
		components:{
			hTimePicker
		},
		data() {
			return {
				firstTypeId:'',
				id:'',
				difference:null,
				buylist:[],		//订单列表
				goodsPrice:0.0,	//商品合计价格
				sumPrice:0,	//用户付款价格
				freight:12.00,	//运费
				note:'',		//备注
				int:1200,		//抵扣积分
				deduction:0,	//抵扣价格
				recinfo:{},
				appointment:'立即下单'
			};
		},
		onLoad(options){
			this.appointment = options.appointment
			this.firstTypeId = options.firstType
			this.id = options.id
			let jsondata = JSON.parse(options.data)
			console.log(jsondata)
			if(options.type==2&&(options.firstType==3||options.firstType==9)){
				// this.appointment = options.data.
			}
			this.difference=JSON.parse(options.type)
			this.buylist = jsondata
			let sumPrice=this.sumPrice
			for(let item of this.buylist){
				item.val=""
				sumPrice += parseFloat(item.payment)
				
			}
			sumPrice=sumPrice.toFixed(2)
			this.sumPrice=sumPrice
		},
		onShow() {

			uni.getStorage({
				key:'selectAddress',
				success: (e) => {
					this.recinfo = e.data;
					uni.removeStorage({
						key:'selectAddress'
					})
				}
			})
		},
		onReady() {
			addressModel.getByUserIdAddr((data)=>{
				console.log(data)
				for(let i=0;i<data.length;i++){
					if(data[i].setDefaultAddress==1){
						this.recinfo=data[i]
					}
				}
			})
			console.log(this.recinfo)
		},
		onBackPress() {
			//页面后退时候，
		},
		filters: {
			toFixed:function(x) {
				return parseFloat(x).toFixed(2);
			}
		},
		methods: {
			sub(){
				console.log(this.difference)
				uni.showLoading({
				    title: '正在提交中...',
					mask:true
				});
				if(JSON.stringify(this.recinfo) == "{}"){
					this.$api.msg("请选择收货人信息")
					return
				}
				let buylist=this.buylist
				console.log(buylist)
				if(this.difference == 1){
					let subData={receiverAddressId:this.recinfo.receiverAddressId}
					let buyerMessage=[]
					let goodsItemIdList=""
					for(let i=0;i<buylist.length;i++){
						let orderItemList=buylist[i].orderItemList
						for(let s=0;s<orderItemList.length;s++){
							goodsItemIdList+=orderItemList[s].itemId+","
						}
						let item={sellerId:buylist[i].sellerId,remarks:buylist[i].val}
						buyerMessage.push(item)
					}
					
					goodsItemIdList=goodsItemIdList.substring(0,goodsItemIdList.length-1)
					subData.goodsItemIdList=goodsItemIdList
					subData.buyerMessage=JSON.stringify(buyerMessage)
					//获取订单流水号 data
					confirmationModel.addCartToOrder(subData,(outTradeNo)=>{					
						payModel.tenpayPayOrder({outTradeNo:outTradeNo})  //调用支付
					})
					
				}else if(this.difference == 0){
					// let obj={}
					let onesubData={receiverAddressId:this.recinfo.receiverAddressId,sourceType:4}
					for(let i=0;i<buylist.length;i++){
						let orderItemList=buylist[i].orderItemList
						for(let s=0;s<orderItemList.length;s++){
							onesubData.num=orderItemList[s].num
							onesubData.goodsItemId =orderItemList[s].itemId
						}
						onesubData.buyerMessage=buylist[i].val
					}
					if(this.firstTypeId==3||this.firstTypeId==9){
						onesubData.serviceStartTime = this.appointment
					}
					confirmationModel.addOneGoodsToOrder(onesubData,(outTradeNo)=>{
						payModel.tenpayPayOrder({outTradeNo:outTradeNo})  //调用支付 1表示商品类型支付
					})
				}else if(this.difference == 2){
					let orderIdList = []
					for(let i of buylist){
						orderIdList.push(i.orderItemList[0].orderId)
					}
					orderIdList = orderIdList.join(',')
					
					confirmationModel.addPayOrder({orderIdList,payType:2},(data)=>{
						payModel.tenpayPayOrder({outTradeNo:data})
					})
				}
				uni.hideLoading();
			},
			toPay(){
				//商品列表
				let paymentOrder = [];
				let goodsid=[];
				let len = this.buylist.length;
				for(let i=0;i<len;i++){
					paymentOrder.push(this.buylist[i]);
					goodsid.push(this.buylist[i].id);
				}
				if(paymentOrder.length==0){
					uni.showToast({title:'订单信息有误，请重新购买',icon:'none'});
					return ;
				}
				//本地模拟订单提交UI效果
				uni.showLoading({
					title:'正在提交订单...'
				})
				setTimeout(()=>{
					uni.setStorage({
						key:'paymentOrder',
						data:paymentOrder,
						success: () => {
							uni.hideLoading();
							uni.redirectTo({
								url:"../pay/payment/payment?amount="+this.sumPrice
							})
						}
					})
				},1000)
				
			},
			//选择收货地址
			selectAddress(){
				uni.navigateTo({
					url:'../user/address/address?type=select'
				})
			},
			changeTime(date,time){
				time = new Date(time)
				let year = time.getFullYear()
				let month = time.getMonth() + 1
				let day = time.getDate()
				let hours = time.getHours()
				let minute = time.getMinutes()
				if(month>0&&month<10){
					month = '0' + month
				}
				if(day>0&&day<10){
					day = '0' + day
				}
				if(hours>=0&&hours<10){
					hours = '0' + hours
				}
				if(minute>=0&&minute<10){
					minute = '0' + minute
				}
				this.appointment = `${year}年${month}月${day}日 ${hours}:${minute}`
			},
		}
	}
</script>

<style lang="scss">
page{
	background-color: #F2F2F2;
	padding-bottom: 100rpx;
}	
.addr{
	background-color: #FFFFFF;
	padding: 37upx 20upx;
	margin: 30upx auto 20upx auto;
	display: flex;
	align-items: center;
	.icon{
		width: 80upx;
		height: 80upx;
		display: flex;
		align-items: center;
		image{
			width: 51upx;
			height: 60upx;
		}
	}
	.tel-name{
		width: 100%;
		display: flex;
		font-size: 32upx;
		.tel{
			margin-left: 40upx;
		}
	}
	.item{
		color:rgba(160,160,160,1);
		text{
			font-size: 32upx;
			color: $theme-text-color;
		}
	}
	.addres{
		width: 100%;
		font-size: 26upx;
		color: #999;
	}
}



.footer{
		width: 100%;
		background-color: #fbfbfb;
		padding:0 20upx;
		height: 100upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 28upx;
		position: fixed;
		bottom: 0upx;
		z-index: 5;
		
		.settlement{
			width: 80%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			.sum{
				width: 50%;
				font-size: 28upx;
				margin-right: 10upx;
				display: flex;
				justify-content: flex-end;
				.money{
					font-weight: 600;
				}
			}
			.btn{
				padding: 0 30upx;
				height: 60upx;
				background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30upx;
				border-radius: 40upx;
			}
		}
	}
.detail{
	background-color: #FFFFFF;
	padding: 37upx 20upx;
	margin: 30upx auto 20upx auto;

	.row{
		height: 60upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.nominal{
			font-size: 28upx;
		}
		.content{
			font-size: 28upx;
			font-weight:600;
			color: $theme-text-color;
		}
	}
}

.itemList{
	background-color: #fff;
	.row{
		.store{
			padding-left: 20rpx; 
			display: flex;
			align-items: center;
			height:90rpx;
			image{
				width:32rpx;
				height:29rpx;
			}
			.title{
				margin-left: 10rpx;
			}
		}
		.item{
			width:100%;
			height:80rpx;
			margin-bottom: 30rpx;
			display: flex;
			.imgContainer{
				width:80rpx;
				height:80rpx;
				padding: 14rpx;
				margin-left: 20rpx;
				background-color: #F7F7F7;
				image{
					width:52rpx;
					height:52rpx;
				}
			}
			.itemContainer{
				height:80rpx;
				margin-left: 20rpx;
				.itemTop{
					height:40rpx;
					width:610rpx;
					display: flex;
					justify-content: space-between;
				}
				.itemBottom{
					height:40rpx;
					width:610rpx;
					display: flex;
					justify-content: space-between;
					font-size:22rpx;
					color:rgba(160,160,160,1);
				}
			}
		}
		.otherFee{
			display: flex;
			justify-content: space-between;
			height:40rpx;
			align-items: center;
			.title{
				margin-left: 20rpx;
			}
			.post{
				margin-right: 20rpx;
			}
		}
		.total{
			display: flex;
			height:60rpx;
			justify-content: flex-end;
			align-items: center;
			width:100%;
			border-bottom: 1rpx solid #F2F2F2;
			.fee{
				margin-right: 20rpx;
				text{
					color:#FF6600;
				}
			}
		}
		.remarks{
			display: flex;
			margin-left: 20rpx;
			align-items: center;
			height: 104rpx;
			border-top: 1rpx solid rgba(220,220,220,1);
			font-weight:400;
			color:rgba(100,100,100,1);
			input{
				flex: 1;
				font-size: 26rpx;
			}
		}
	}
}

.appointment{
	width:750rpx;
	height:84rpx;
	display: flex;
	align-items: center;
	padding:0 20rpx;
	justify-content:space-between;
	background-color: #fff;
	margin-bottom: 20rpx;
	.changeTime{
		color:rgba(255,102,0,1);
		line-height:38rpx;
		image{
			width:10rpx;
			height:20rpx;
		}
	}
}

</style>
