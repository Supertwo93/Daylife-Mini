<template>
	<view>
		<view class="carousel-section">
			<swiper class="swiper" circular="true" autoplay="true" @change="swiperChange">
				<swiper-item v-if="video!=0" :key="index">
					<video class="swiper-img" :src="video" mode=""></video>
				</swiper-item>
				<swiper-item v-for="(item,index) in pic" :key="index">
					<image class="swiper-img" :src="item" mode="cover"></image>
				</swiper-item>
			</swiper>
			<view class="current">
				{{current+1}}/{{swiperTotal}}
			</view>
		</view>
		<provide-title @shareLink="share" :price="data.goods.price" :title="data.goods.goodsName" 
		:sale="'月售' + data.goods.monthSale" :spec="data.goods.postFee" :type="data.goods.goodsFirsttype"
		:disc="data.goods.distance|fixOne"></provide-title>
		<view class="spec" @tap="chooseSpec">
			<view class="gray">规格</view>
			<view class="choose">{{speced}}</view>
			<image src="/static/cut/grayright.png"></image>
		</view>
		<view class="detail">
			<view class="detail-title">商品详情</view>
			<view class="content" v-if="data.goods.caption==null">暂无</view>
			<view class="content" v-else>{{data.goods.caption}}</view>
		</view>
		<view class="comment">
			<view class="top">
				<view class="title">商品评价({{comment.length}})</view>
				<view class="all" @tap="toComment">
					<view>查看全部</view>
					<image src="/static/cut/right_orange.png"></image>
				</view>
			</view>
			<block v-if="comment.length==0">
				<view class="noComment">该商品暂无评价</view>
			</block>
			<block v-if="comment.length!=0">
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
		<view v-if="sellerdata.sellerId!==null" class="store">
			<image class="storeImg" :src="sellerdata.logoPic"></image>
			<view class="rt">
				<view class="storeName">
					<view>{{sellerdata.nickName}}</view>
					<image src="/static/cut/company_cer.png"></image>
				</view>
				<view class="stars">
					<view class="starlf">
						<image src="/static/cut/comment-star.png"></image>
						<view>{{sellerdata.mainScore}}</view>
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
				<image v-if="data.goods.isCollect==0" src="/static/cut/no_collect.png"></image>
				<image v-else src="/static/cut/collected.png"></image>
				<view>收藏</view>
			</view>
			<view @tap="toChat" class="contact">
				<image src="/static/cut/message.png"></image>
				<view>联系</view>
			</view>
			<view v-if="type==3||type==9" class="theme-button" @tap="chooseSpec">立即下单</view>
			<view v-if="type==8||type==10" class="life-button">
				<view @tap="addToCart" class="left">加入购物车</view>
				<view @tap="chooseSpec" class="right">立即下单</view>
			</view>
		</view>
		
		<uni-popup ref="popbottom" type="bottom">
			<view class="popBox">
				<view class="descri">
					<image :src="data.itemList[labelIndex].image"></image>
					<view class="content">
						<view class="de-price">￥{{data.itemList[labelIndex].price}}</view>
						<view v-if="type==8||type==10" class="de-stock">库存{{data.itemList[labelIndex].stockCount}}件</view>
						<view v-if="type==3||type==9" class="de-stock">配送至龙岗区</view>
						<view class="ti">请选择属性</view>
					</view>
				</view>
				<view class="tips">请选择规格</view>
				<view class="labelBox">
					<view v-for="(item,index) in data.itemList" :key="index" class="label" @tap="chooseLabel(index)" :class="labelIndex==index?'on':'' ">
						{{item.spec}}
					</view>
				</view>
				<view v-if="type==8||type==10" class="number">
					<view class="describ">购买数量</view>
					<view>
						<view class="sub" @tap.stop="sub(good)">
							<image src="https://sgz.wdttsh.com/mini_static/cut/minus.png" ></image>
						</view>
						<input type="number" v-model="number"/>
						<view class="add"  @tap.stop="add(good)">
							<image src="https://sgz.wdttsh.com/mini_static/cut/plus.png"></image>
						</view>
					</view>
				</view>
				<view v-if="type==3||type==9" class="signButton" @tap="confirmSign">确定</view>
				<view v-if="type==8||type==10" class="otherButton">
					<view @tap="addCart" class="buttonOne">加入购物车</view>
					<view @tap="confirmSign" class="buttonTwo">立即下单</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import commentBox from '@/components/commentBox.vue'
import provideTitle from '@/components/provide-title.vue'
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import {ProvideModel} from '@/common/models/provide.js'
const providemodel = new ProvideModel()
import {GoodsModel} from '@/common/models/goods.js'
const goodsmodel = new GoodsModel()
import {StoreModel} from '@/common/models/store.js'
const storemodel = new StoreModel()
import {LikeModel} from '@/common/models/like.js'
const likemodel = new LikeModel()
import {OrderModel} from '@/common/models/order.js'
const ordermodel = new OrderModel()
import {mapState} from 'vuex'
export default{
	filters:{
		fixOne(value){
		
			return parseFloat(value/1000).toFixed(1) + 'km'
		},
		starName(value){
			console.log(value)
			return `${value.charAt(0)}***${value.charAt(value.length-1)}`
		}
	},
	components: {
		provideTitle,
		uniPopup,
		commentBox
	},
	computed:{
		...mapState(['hasLogin','lat','lon'])
	},
	data(){
		return{
			type:'',
			data:'',
			id:'',
			pic:[],
			video:'',
			sellerId:'',
			sellerdata:'',
			starSrc:'/static/cut/star_on.png',
			starOn:'/static/cut/star_on.png',
			starOff:'/static/cut/star_off.png',
			starIndex:[0,1,2,3,4],
			labelIndex:0,
			spec:[],
			number:1,
			speced:'请选择',
			comment:[],
			commentNum:0,
			current:0,
			swiperTotal:0,
			src:['/static/cut/comment-star.png','/static/cut/commnet-star-dowm.png'],
			commentOne:{}
		
		}
	},
	onLoad(options){
		console.log(options)
		this.type = options.type
		this.id = options.id
		if(this.hasLogin){
			providemodel.addVisitRecord({firstTypeInfoId:options.type,mainId:options.id},(data)=>{
				
			})
		}
		
		storemodel.getSellerInfo({sellerId:options.sellerId,smallProgram:1},(data)=>{
			this.sellerdata = data
		})
		ordermodel.queryGoodsComment({goodsId:options.id},(data)=>{
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
	onShow() {
		providemodel.getItemDetail({goodsId:this.id,latitude:this.lat,longitude:this.lon},(data)=>{
			this.data = data
			let image = data.goodsDesc.itemImages
			image = image.split(',')
			this.pic = image
			if(data.goodsDesc.imgVideo===null){
				this.video = 0
			}else{
				this.video = data.goodsDesc.imgVideo
			}
			if(this.video==0){
				this.swiperTotal = this.pic.length 
			}else{
				this.swiperTotal = this.pic.length + 1
			}
			console.log(this.data,this.pic)
		})
	},
	onShareAppMessage(res){
		return{
			title:this.data.goods.goodsName,
		}
	},
	methods:{
		toCollect(){
			console.log(this.data.goods.isCollect);
			if(this.data.goods.isCollect == 0){
				this.data.goods.isCollect = 1;
				uni.showToast({
					title: '收藏成功',
					icon:'none',
					duration:1500
				})
			}else{
				this.data.goods.isCollect = 0;
				uni.showToast({
					title: '取消收藏成功',
					icon:'none',
					duration:1500
				});
			}
			likemodel.like(this.data.goods.id,this.type,this.data.goods.isCollect,(data)=>{
				
			})
		},
		addToCart(){
			this.$refs.popbottom.open()
		},
		addCart(){
			providemodel.addCart({goodsItemId:this.data.goods.defaultItemId,num:this.number},(data)=>{
				uni.showToast({
					title:"添加购物车成功",
					duration:1500,
					icon:'none'
				})
			})
		},
		swiperChange(e){
			console.log(e)
			this.current = e.detail.current
		},
		chooseSpec(){
			this.$refs.popbottom.open()
		},
		chooseLabel(index){
			this.labelIndex = index
		},
		confirmSign(){
			let req = {goodsItemId:this.data.itemList[this.labelIndex].goodsItemId,num:this.number}
			providemodel.addOneTotal(req,(data)=>{
				console.log(data)
				uni.navigateTo({
					url:`/pages/order/confirmation?data=${JSON.stringify(data)}&type=${0}&id=${this.id}&firstType=${this.sellerdata.firstTypeId}`
				})
			})
			// uni.navigateTo({
			// 	url:'sign?data=' + JSON.stringify(this.data) + '&index=' + this.labelIndex 
			// })
		},
		toStore(){
			let _self = this
			uni.navigateTo({
				url:'../shop/shop?sellerId=' + _self.sellerdata.sellerId
			})
		},	
		sub(){
			if(this.number == 1){
				this.number = this.number
			}else{
				this.number -= 1
			}
		},
		add(){
			this.number = parseInt(this.number) + 1
		},
		toComment(){
			uni.navigateTo({
				url:'goodsComment?data=' + JSON.stringify(this.comment)
			})
		},
		phoneToSeller(){
			uni.makePhoneCall({
				phoneNumber:this.sellerdata.linkmanMobile
			})
		},
		async toChat(){
			if(this.sellerdata.isFalse == 1){
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
			const {data:res} = await this.tim.getConversationProfile(`C2C${this.sellerdata.userId}`)
			name = res.conversation.userProfile.nick
			this.$store.commit('updateCurrentConversation',res.conversation)
			this.$store.dispatch('getMessageList')
			uni.navigateTo({
				url:'/pages/msg/chat?toAccount=' + name
			})
		},
		share(){
			
		}
		
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
	padding-bottom: 110rpx;
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

.detail{
	background-color: #fff;
	padding:0 20rpx;
	margin-bottom: 10rpx;
	.detail-title{
		height:64rpx;
		color:#1E1E1E;
		line-height:64rpx;
		border-bottom: 1rpx solid #f2f2f2;
	}
	.content{
		color:#1E1E1E;
		padding:30rpx 0;
	}
	
}


.spec{
	background-color: #fff;
	margin:10rpx 0;
	height:84rpx;
	display: flex;
	align-items: center;
	image{
		width:10rpx;
		height:20rpx;
	}
	.gray{
		margin-left: 20rpx;
	}
	.choose{
		margin-left: 30rpx;
	}
	image{
		margin-left: 540rpx;
	}
}
.comment{
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


.popBox{
	padding:20rpx;
	.descri{
		display: flex;
		height:200rpx;
		.content{
			margin-top: 75rpx;
			.de-price{
				color:#FF4E00;
				font-size:36rpx;
			}
			.de-stock{
				color:#A0A0A0;
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
	.number{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 30rpx;
		view{
			display: flex;
			align-items: center;
			input{
				width:120rpx;
				height:50rpx;
				text-align: center;
				border:1rpx solid #f2f2f2;
				background-color: #ECECEC;
			}
			.sub{
				margin-right: 10rpx;
				width:54rpx;
				height:54rpx;
				background:rgba(236,236,236,1);
				border-radius:6rpx 0px 0px 6rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				image{
					width:18rpx;
					height:4rpx;
				}
			}
			.add{
				display: flex;
				align-items: center;
				justify-content: center;
				margin-left: 10rpx;
				width:54rpx;
				height:54rpx;
				background:rgba(236,236,236,1);
				border-radius:0px 6rpx 6rpx 0px;
				image{
					width:18rpx;
					height:18rpx;
				}
			}
		}
	}
	.signButton{
		margin-top: 30rpx;
		height:70rpx;
		width:650rpx;
		color:#fff;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
		border-radius:35rpx;
	}
	.otherButton{
		margin-top: 30rpx;
		height:70rpx;
		widht:650rpx;
		color:#fff;
		display: flex;
		view{
			width:355rpx;
			height:100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.buttonOne{
			border-radius: 35rpx 0 0 35rpx;
			background:linear-gradient(-90deg,rgba(255,180,0,1),rgba(250,226,67,1));
		}
		.buttonTwo{
			border-radius:0 35rpx 35rpx 0;
			background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
		}
	}
}
</style>
