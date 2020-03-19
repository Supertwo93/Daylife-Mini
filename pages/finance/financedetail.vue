<template>
	<view>
		<view class="carousel-section">
			<swiper class="swiper" circular="true" autoplay="true"  @change="swiperChange">
				<swiper-item v-if="video!=0">
					<video :src="video"></video>
				</swiper-item>
				<swiper-item v-for="(item,index) in picture" :key="index">
					<image class="swiper-img" :src="item" mode=""></image>
				</swiper-item>
			</swiper>
			<view class="current">
				{{current+1}}/{{swiperTotal}}
			</view>
		</view>
		<provide-title :price="data.price" :type="5" :spec="data.monthSale" :title="data.title" :disc="data.distance|fixOne"></provide-title>
		
		<view v-if="data.secondTypeId =='6364df4f0ede49da9063b6cc5d4dfc72' " class="choose" @tap="toSign">
			<view class="title">类型</view>
			<view class="tips">请选择</view>
			<image src="/static/cut/grayright.png"></image>
		</view>
		
		<view v-if="data.secondTypeId =='6364df4f0ede49da9063b6cc5d4dfc72'" class="range">
			<view class="title">委托业务范围</view>
			<view class="label gray">
				<view>业务名称</view>
				<view>收费标准</view>
			</view>
			<view v-for="(item,index) in data.rangeList" :key="index" class="label">
				<view>{{item.rangeName}}</view>
				<view>{{item.rangePrice}}</view>
			</view>
		</view>
		
		<view class="condition" v-if="data.secondTypeId == 'e7fb24d27ba141e4a038213bfc190076'">
			<view class="quta">
				<view class="quta-item">
					<view class="item-name">额度</view>
					<view class="item-price">{{data.loanQuota}}</view>
				</view>
				<view class="quta-item">
					<view class="item-name">期限</view>
					<view class="item-price">{{data.loanTimelimit}}</view>
				</view>
				<view class="quta-item">
					<view class="item-name">费率</view>
					<view class="item-price">{{data.loanRates}}</view>
				</view>
			</view>
			<view class="apply">
				<view class="apply-item">
					<view class="apply-name">申请条件</view>
					<view class="apply-content">{{data.applyCondition}}</view>
				</view>
				<view class="apply-item">
					<view class="apply-name">申请要点</view>
					<view class="apply-content">{{data.applyMainpoints}}</view>
				</view>
				<view class="apply-item">
					<view class="apply-name">所需材料</view>
					<view class="apply-content">{{data.applyMaterial}}</view>
				</view>
			</view>
		</view>
		
		
		
		
		<view class="detail">
			<view class="title">业务详情</view>
			<view class="content">{{data.details}}</view>
		</view>
		
		<view class="comment">
			<view class="top">
				<view class="title">服务评价({{comment.length}})</view>
				<view class="all" @tap="toComment">
					<view>查看全部</view>
					<image src="/static/cut/right_orange.png"></image>
				</view>
			</view>
			<block v-if="comment.length==0">
				<view class="noComment">该商品暂无评价</view>
			</block>
			<block v-else>
				<view class="commentBox">
					<view class="box-top">
						<image class="logo" :src="commentOne.logoImg"></image>
						<view class="user">
							<view class="user-name">{{commentOne.nickName|starName}}</view>
							<view class="star-point">
								评分
								<block v-for="(img,num) in starIndex" :key="num">
									<image :src="commentOne.goodScore>num?src[0]:src[1]"></image>
								</block>
							</view>
						</view>
						<view class="time">{{commentOne.createTime}}</view>
					</view>
					<view class="comment-content">
						<text class="comment-spec">#{{commentOne.spec}}#</text>
						<text>{{commentOne.content}}</text>
					</view>
				</view>
			</block>
		</view>
		
		
		<view class="store">
			<image class="storeImg" :src="storeInfo.logoPic"></image>
			<view class="rt">
				<view class="storeName">
					<view>{{storeInfo.nickName}}</view>
					<image src="/static/cut/company_cer.png"></image>
				</view>
				<view class="stars">
					<view class="starlf">
						<image src="/static/cut/comment-star.png"></image>
						<view>{{storeInfo.mainScore}}</view>
					</view>
					<view class="starrt">
						<view class="phone" @tap="phoneToSeller()">拨打电话</view>
						<view class="into" @tap="toStore()">进店看看</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="bottomFix">
			<view class="collect" @tap="toCollect()">
				<image v-if="data.isCollect==0" src="/static/cut/no_collect.png"></image>
				<image v-else src="/static/cut/collected.png"></image>
				<view>收藏</view>
			</view>
			<view @tap="toChat" class="contact">
				<image src="/static/cut/message.png"></image>
				<view>联系</view>
			</view>
			<view class="theme-button" @tap="toSign">立即签约</view>
		</view>
		
		<uni-popup ref="popbottom" type="bottom">
			<view class="popBox">
				<view class="descri">
					<image :src="data.specsList[labelIndex].specsPicture"></image>
					<view class="content">
						<view class="con-price">￥{{data.specsList[labelIndex].specsPrice}}</view>
						<view>服务：龙岗区</view>
					</view>
				</view>
				<view class="tips">请选择类型</view>
				<view class="labelBox">
					<view v-for="(item,index) in data.specsList" :key="index" class="label" @tap="chooseLabel(index)" :class="labelIndex==index?'on':'' ">
						{{item.specsName}}
					</view>
				</view>
				<view class="signButton" @tap="confirmSign">确定</view>
			</view>
			
		</uni-popup>
	</view>
</template>

<script>
import provideTitle from '@/components/provide-title.vue'
import uniPopup from "@/components/uni-popup/uni-popup.vue"
import {FinanceModel} from '@/common/models/finance.js'
import {StoreModel} from '@/common/models/store.js'
import {LikeModel} from '@/common/models/like.js'
import {OrderModel} from '@/common/models/order.js'
import {mapState} from 'vuex'
const likemodel = new LikeModel()
let storemodel = new StoreModel()
let financemodel = new FinanceModel()
const ordermodel = new OrderModel()
export default{
	filters: {
		fixOne(value){
		
			return parseFloat(value/1000).toFixed(1) + 'km'
		},
		starName(value){
			return `${value.charAt(0)}***${value.charAt(value.length-1)}`
		}
	},
	computed:{
		...mapState(['lat','lon'])
	},
	components:{
		provideTitle,
		uniPopup
	},
	data(){
		return{
			starSrc:'/static/cut/star_on.png',
			picture:'',
			data:'',
			sellerId:'',
			storeInfo:'',
			starIndex:[0,1,2,3,4],
			labelIndex:0,
			video:'',
			current:0,
			swiperTotal:0,
			comment:[],
			src:['/static/cut/comment-star.png','/static/cut/commnet-star-dowm.png'],
			commentOne:{}
		}
	},
	onLoad(options){
		console.log(options)
		let req = {id:options.financeId,financeCode:options.code,sellerId:options.sellerId,latitude:this.lat,longitude:this.lon}
		financemodel.getFinanceDetail(req,(data)=>{
			this.picture = data.picture.split(',')
			if(data.hasOwnProperty('imgVideo')){
				this.video = data.imgVideo
			}else{
				this.video = 0
			}
			if(this.video==0){
				this.swiperTotal = this.picture.length 
			}else{
				this.swiperTotal = this.picture.length + 1
			}
			this.data = data
		})
		this.sellerId = options.sellerId
		let storeReq = {sellerId:options.sellerId}
		storemodel.getSellerInfo(storeReq,(data)=>{
			this.storeInfo = data
		})
		ordermodel.queryGoodsComment({goodsId:options.financeId},(data)=>{
			this.comment = data.goodCommentList
			if(this.comment.length==0){
				let obj = {}
				obj.nickName = 'stan'
				this.commentOne = obj
			}else{
				this.commentOne = this.comment[0]
			}
		})
	},
	
	methods:{
		toStore(){
			uni.navigateTo({
				url:'/pages/shop/storeindex?sellerId=' + this.sellerId
			})
		},
		toCollect(){
			console.log(this.data.isCollect);
			if(this.data.isCollect == 0){
				this.data.isCollect = 1;
				uni.showToast({
					title: '收藏成功',
					icon:'none',
					duration:1500
				});
			}else{
				this.data.isCollect = 0;
				uni.showToast({
					title: '取消收藏成功',
					icon:'none',
					duration:1500
				});
			}
			likemodel.like(this.data.id,this.data.firstTypeId,this.data.isCollect,(data)=>{
			})
		},
		toComment(){
			uni.navigateTo({
				url:'/pages/provide/goodsComment?data=' + JSON.stringify(this.comment)
			})
		},
		toSign(){
			if(this.data.secondTypeId=='6364df4f0ede49da9063b6cc5d4dfc72'){
				this.$refs.popbottom.open()
			}else{
				uni.navigateTo({
					url:`/pages/finance/appointment?data=${JSON.stringify(this.data)}`
				})
			}
		},
		confirmSign(){
			console.log(this.data.specsList[this.labelIndex].specsName)
			uni.navigateTo({
				url:'sign?data=' + JSON.stringify(this.data) + '&index=' + this.labelIndex 
			})
		},
		popClose(){
			this.$refs.popbottom.close()
		},
		chooseLabel(index){
			this.labelIndex = index	
		},
		phoneToSeller(){
			uni.makePhoneCall({
				phoneNumber:this.storeInfo.linkmanMobile
			})
		},
		swiperChange(e){
			console.log(e)
			this.current = e.detail.current
		},
		async toChat(){
			if(this.storeInfo.isFalse == 1){
				uni.showToast({
					title:'该商家不在线，请您电话联系',
					duration:1500,
					icon:'none'
				})
				return
			}
			let name = ''
			this.$store.commit('resetCurrentConversation')
			this.$store.commit('resetGroup')
			const {data:res} = await this.tim.getConversationProfile(`C2C${this.storeInfo.userId}`)
			name = res.conversation.userProfile.nick
			this.$store.commit('updateCurrentConversation',res.conversation)
			this.$store.dispatch('getMessageList')
			uni.navigateTo({
				url:'/pages/msg/chat?toAccount=' + name
			})
		},
		
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
	padding-bottom:110rpx;
}
.carousel-section{
	position: relative;
	swiper{
		width:750rpx;
		height:500rpx;
		image{
			width:750rpx;
			height:500rpx;
		}
		video{
			width:750rpx;
			height:500rpx;
		}
	}
	.current{
		position:absolute;
		right:20rpx;
		bottom:20rpx;
		width:60rpx;
		height:34rpx;
		background:rgba(0,0,0,1);
		opacity:0.36;
		border-radius:17px;
		color:#fff;
		text-align: center;
		line-height:34rpx;
	}
}

.choose{
	margin-top:20rpx;
	height:84rpx;
	background-color: #fff;
	display: flex;
	align-items: center;
	.title{
		color:rgba(160,160,160,1);
		margin-left: 20rpx;
	}
	.tips{
		margin-left: 30rpx;
	}
	image{
		margin-left: 550rpx;
		width:10rpx;
		height:20rpx;
	}
}
.range{
	padding:0 20rpx;
	background-color: #fff;
	margin-top: 20rpx;
	.title{
		height:64rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #f2f2f2;
		color:rgba(120,120,120,1);
	}
	.label{
		height:60rpx;
		width:710rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}

.detail{
	padding:0 20rpx;
	background-color: #fff;
	margin-top: 20rpx;
	.title{
		height:64rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #f2f2f2;
		color:rgba(120,120,120,1);
	}
	.content{
		padding:20rpx 0;
	}
}

.popBox{
	padding:20rpx;
	.descri{
		display: flex;
		height:200rpx;
		.content{
			margin-top: 84rpx;
			.con-price{
				color:#FF4E00;
				font-size:36rpx;
				font-weight: 800;
			}
		}
		image{
			margin-right: 15rpx;
			width:200rpx;
			height:200rpx;
			border-radius:10rpx;
		}
		.icon{
			margin-left: 200rpx;
			width:32rpx;
			height:32rpx;
		}
	}
	.tips{
		margin-top: 50rpx;
	}
	.labelBox{
		margin-top: 20rpx;
		display: flex;
		flex-wrap: wrap;
		.label{
			height:54rpx;
			padding:0 15rpx;
			border:1px solid rgba(180,180,180,1);
			border-radius:27rpx;
			margin-left: 20rpx;
			margin-top: 20rpx;
			display: flex;
			align-items: center;
		}
		.on{
			border:1px solid rgba(255,102,0,1);
			color:#ff6600;
		}
	}
	.signButton{
		height:70rpx;
		width:650rpx;
		color:#fff;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 150rpx;
		background: linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
		border-radius:35rpx;;
	}
}

.condition{
	background-color: #fff;
	padding:40rpx 20rpx;
	margin-top: 20rpx;
	.quta{
		display: flex;
		flex-wrap:wrap;
		border-bottom:1rpx solid #f2f2f2;
		padding-bottom:40rpx;
		.quta-item{
			display: flex;
			width:350rpx;
			&:last-child{
				margin-top: 10rpx;
			}
			.item-name{
				margin-right: 40rpx;
				color:#A0A0A0;
				font-size:28rpx;
			}
		}
	}
	.apply{
		margin-top: 40rpx;
		.apply-item{
			display: flex;
			align-items: center;
			.apply-name{
				width:150rpx;
				color:#A0A0A0;
				font-size:28rpx;
			}
			.apply-content{
				width:550rpx;
				
			}
		}
	}
}

.comment{
	margin-top: 20rpx;
	background-color: #fff;
	.top{
		padding:0 20rpx;
		height:84rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #f2f2f2;
		.all{
			display: flex;
			align-items: center;
			view{
				color:#FF6600;
			}
			image{
				margin-left: 10rpx;
				width:10rpx;
				height:20rpx;
			}
		}
	}
	.commentBox{
		padding:30rpx 20rpx;
		.box-top{
			display: flex;
			align-items: center;
			.logo{
				margin-right: 10rpx;
				width:64rpx;
				height:64rpx;
				border-radius:50%;
			}
			.user{
				margin-right: 200rpx;
				.star-point{
					image{
						margin-left: 6rpx;
						width:22rpx;
						height:22rpx;
					}
				}
			}
			.time{
				font-size:24rpx;
				color:rgba(140,140,140,1);
			}
		}
		.comment-content{
			margin-top: 20rpx;
			margin-left: 70rpx;
			width:650rpx;
			text{
				font-size:28rpx;
			}
			.comment-spec{
				color:#FF6600;
			}
		}
	}
	.noComment{
		padding:40rpx 0;
		font-size:28rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color:#A0A0A0;
	}
}


</style>
