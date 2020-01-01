<template>
	<view>
		<view class="carousel-section">
			<swiper class="swiper" circular="true" autoplay="true">
				<swiper-item v-for="(item,index) in picture" :key="index">
					<image class="swiper-img" :src="item" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<provide-title :price="[data.price + '/月']" :spec="data.squareMetre+'㎡  ' + '|' + '  ' + data.floor + '/' + data.attribute + '层'"
		:title="data.title" :disc="data.distance|fixOne"></provide-title>
		
		<view class="payType" @tap="toPayType">
			<view>
				<view class="title">付款方式</view>
				<view class="remark">（押金及服务费相关规则）</view>
			</view>
			
			<image src="/static/cut/grayright.png"></image>
		</view>
		
		<view class="detail">
			<view class="label">
				<block v-for="(item,index) in label" :key="index">
					<view class="labelItem">{{item}}</view>
				</block>
			</view>
			<view class="itemList">
				<view class='item'>
					<view class="lf">
						<view class="type">面积<text>{{data.squareMetre}}㎡</text></view>
						<view class="type">租房<text>合租</text></view>
						<view class="type">年代<text>{{data.years}}</text></view>
					</view>
					<view class="lf">
						<view class="type">户型<text>{{data.houseType}}</text></view>
						<view class="type">楼层<text>{{data.floor}}/{{data.attribute}}层</text></view>
						<view class="type">房号<text>{{data.houseCode}}</text></view>
					</view>
				</view>
				<view class="address">
					<view>地址<text>{{data.address}}</text></view>
				</view>
			</view>
		</view>
		
		<view class="time">
			<view class="timebox">
				<view>入住日期<text>{{data.checkTime}}</text></view>
				<view>签约时长<text>{{data.signing}}</text></view>
			</view>
		</view>
		
		<view class="descri">
			<view class="container">
				<view class="title">房屋概况</view>
				<view class="content">{{data.survey}}</view>
			</view>
		</view>
		
		<view class="store">
			<image class="storeImg" :src="data.logoPic"></image>
			<view class="storeName">
				<view>{{data.nickName}}</view>
				<image src="/static/cut/company_cer.png"></image>
			</view>
			<view class="stars">
				<block v-for="(item,index) in starIndex" :key="index">
					<image :src="data.mainScore>index?starSrc:''"></image>
				</block>
				{{data.mainScore}}
			</view>
			<view class="into" @tap="toStore()">进店看看</view>
			<image class="intoIcon" src="/static/cut/right_orange.png"></image>
		</view>
		
		<view class="bottomFix">
			<view class="collect" @tap="toCollect()">
				<image v-if="isCollect==0" src="/static/cut/no_collect.png"></image>
				<image v-else src="/static/cut/collected.png"></image>
				<view>收藏</view>
			</view>
			<view class="contact">
				<image src="/static/cut/message.png"></image>
				<view>联系</view>
			</view>
			<view class="theme-button" @tap="toSign()">立即签约</view>
		</view>
	</view>
</template>

<script>
	import provideTitle from '@/components/provide-title.vue'
	import {LikeModel} from '@/common/models/like.js'
	const likemodel = new LikeModel()
	import {StoreModel} from '@/common/models/store.js'
	const storemodel = new StoreModel()
	import {HouseModel} from '@/common/models/house.js'
	const housemodel = new HouseModel()
	import {mapState} from 'vuex'
	export default{
		filters:{
			fixOne(value){
				return parseFloat(value/1000).toFixed(1) + 'km'
			}
		},
		components:{
			provideTitle
		},
		computed:{
			...mapState(['lat','lon'])
		},
		data(){
			return{
				data:[],
				label:[],
				starSrc:'/static/cut/star_on.png',
				starIndex:[0,1,2,3,4],
				picture:[],
				isCollect:'',
				isOpenDate:''
			}
		},
		methods:{
			toCollect(){
				if(this.isCollect == 0){
					this.isCollect = 1;
					uni.showToast({
						title: '收藏成功',
						icon:'none',
						duration:1500
					});
				}else{
					this.isCollect = 0;
					uni.showToast({
						title: '取消收藏成功',
						icon:'none',
						duration:1500
					});
				}
				likemodel.like(this.data.id,this.data.firsttypeId,this.isCollect,(data)=>{
					// likemodel.getCollectgood(1,(res)=>{
						
					// })
				})
			},
			toStore(){
				9
				uni.navigateTo({
					url:`../shop/storeindex?sellerId=${this.data.sellerId}&type=1`
				})
			},
			toSign(){
				let _self = this
				uni.navigateTo({
					url:'sign?data=' + JSON.stringify(_self.data)
				})
			},
			toPayType(){
				uni.navigateTo({
					url:'paytype?data=' + JSON.stringify(this.data) 
				})
			}
		},
		onLoad:function(options){
			let id = options.data
			housemodel.getHouseList({houseId:id,longitude:this.lon,latitude:this.lat},data=>{
				this.data = data.houseList[0]
				this.isCollect = data.isCollect
				storemodel.getSellerStore({sellerId: this.data.sellerId},(res)=>{
					this.isOpenDate = res.isOpenDate;
				})
				this.data.mainScore = parseInt(this.data.mainScore)
				this.label = this.data.label.split(',')
				this.picture = this.data.picture.split(',')
			})
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
	padding-bottom:130rpx;
}
.carousel-section{
	swiper{
		width:750rpx;
		height:500rpx;
		image{
			width:750rpx;
			height:500rpx;
		}
	}

}

.payType{
	background-color: #fff;
	margin:20rpx 0;
	height:84rpx;
	width:750rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20rpx;
	view{
		display: flex;
		
		.remark{
			font-size:24rpx;
			font-weight:400;
			color:rgba(160,160,160,1);
			line-height:36rpx;
		}
	}
	image{
		width:10rpx;
		height:20rpx;
	}
}

.detail{
	background-color: #fff;
	width:750rpx;
	// height:322rpx;
	padding:30rpx 0;
	.label{
		display: flex;
		flex-wrap: wrap;
		.labelItem{
			margin-left: 20rpx;
			height:36rpx;
			border:1px solid rgba(41,181,246,1);
			border-radius:6rpx;
			font-size:20rpx;
			color:rgba(41,181,246,1);
			padding: 4rpx 11rpx 4rpx 11rpx;
			margin-top: 20rpx;
		}
	}
	.itemList{
		margin-top: 40rpx;
		.item{
			display: flex;
			.lf{
				margin-left: 20rpx;
				display: flex;
				flex-direction: column;
				width:50%;
				.type{
					color:#A0A0A0;
					margin-bottom: 15rpx;
					
				}
			}
		}
		.address{
			margin-left: 20rpx;
			color:#A0A0A0;
		}
	}
}
.time{
	background-color: #fff;
	height:158rpx;
	.timebox{
		border-top: 1rpx solid #f2f2f2;
		margin: 0 20rpx;
		view{
			margin-top: 30rpx;
			color:#A0A0A0;
		}
	}
}
text{
	margin-left: 39rpx;
	color:#3C3C3C;
}

.descri{
	width:100%;
	height:235rpx;
	margin:20rpx 0;
	background-color: #fff;
	.container{
		margin: 0 20rpx;
		.title{
			line-height: 64rpx;
			height:64rpx;
			border-bottom: 1rpx solid #f2f2f2;
			color:rgba(120,120,120,1);
		}
		.content{
			margin-top: 29rpx;
		}
	}
}

.store{
	width:100%;
	height:160rpx;
	position: relative;
	background-color: #fff;
	margin-bottom: 20rpx;
	.storeImg{
		position: absolute;
		top:30rpx;
		left:20rpx;
		width:100rpx;
		height:100rpx;
	}
	.storeName{
		position: absolute;
		top:36rpx;
		left:142rpx;
		display: flex;
		align-items: center;
		view{
			font-size:34rpx;
			font-weight:500;
			color:rgba(60,60,60,1);
		}
		image{
			width:24rpx;
			height:24rpx;
		}
	}
	.stars{
		position: absolute;
		top:100rpx;
		left:142rpx;
		image{
			width:25rpx;
			height:23rpx;
		}
	}
	.into{
		position: absolute;
		top:108rpx;
		right:40rpx;
		color:#FF6600;
		font-size:24rpx;
	}
	.intoIcon{
		position: absolute;
		top:115rpx;
		right:20rpx;
		width:10rpx;
		height:19rpx;
	}
}



</style>
