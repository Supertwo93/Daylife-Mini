<template>
	
	<view class="content">
		<view class="top">
			<bavigationbar></bavigationbar>
			<view class="shop-head">
				<image class="item-img" :src="storeInfo.logoPic" alt=""></image>
				<view class="main-left">
					<view class="main-title">
						<text class="tit">{{storeInfo.nickName}} <text class="iconfont icon-renyuanbaoming"></text></text>
						<image @tap="addToCollect" class="likeImg" v-if="storeInfo.isCollect==0" src="/static/cut/no_collect.png"></image>
						<image @tap="cancelCollect" class="likeImg" v-else src="/static/cut/collected.png"></image>
					</view>
					<view class="main-parameter">
						<text class="iconfont icon-xing"></text>店铺总评分{{storeInfo.mainScore}}
					</view>
					<view class="address">
						<text class="iconfont icon-dingwei"></text>{{storeInfo.address}}
					</view>
					
				</view>
			</view>
		</view>
		<view class="spacing"></view>
		<view class="main-scroll">
			<scroll-view scroll-y class="left-aside">
				<view v-for="(item,index) in list" :key="item.id" class="f-item b-b" :class="{active: item.id === currentId}" @click="tabtap(item)">
					{{item.name}}
				</view>
			</scroll-view>
			<scroll-view scroll-with-animation scroll-y class="right-aside" :scroll-into-view="slideTop" @scroll="asideScroll" :scroll-top="tabScrollTop">
				<view v-for="(items,idx) in list" :key="items.id" class="s-list" :id="'main-'+items.id">
					<text class="s-item">{{items.name}}</text>
					<view class="t-list">
						<view @click="navToList(titem.id,titem.goodsFirsttype)" class="t-item" v-for="titem in items.goodsList" :key="titem.id">
							<image :src="titem.smallPic" mode="widthFix"></image>
							<view class="right_word">
								<view class="t_info">{{titem.goodsName}}</view>
								<view class="p_info">
									<view class="price_txt">
										<text>￥</text>{{titem.price}}
									</view>
									<text class="receive">
										<text class="receive" v-if="titem.goodsFirsttype==3||titem.goodsFirsttype==9">已接单</text>
										<text class="receive" v-if="titem.goodsFirsttype==8||titem.goodsFirsttype==10">月售</text>
										{{titem.totalSale}}
									</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<view class="button-group">
			<view class="contact" @tap="toChat()">
				<image src="/static/cut/message.png"></image>
				<view>联系TA</view>
			</view>
			<view @tap="toCart()" class="cart">购物车</view>
		</view>
	</view>
	
	
	
</template>

<script>
	import {LikeModel} from '@/common/models/like.js'
	let Likemodel=new LikeModel()
	import {StoreModel} from '@/common/models/store.js'
	let storemodel=new StoreModel()
	import bavigationbar from "@/components/bavigation-bar.vue"
	import like from "@/components/like.vue"

export default {
  name: '',
  components: {
   bavigationbar,
   like

  },
  data () {
    return {
	  like:null,
      sizeCalcState: false,
      tabScrollTop: 0,
      currentId: 0,
      flist: [],	
      slist: [],	
      tlist: [],
	  list:[],
	  sellerId: '',
	  slideTop: '',
	  storeInfo:''
    }
  },
  onLoad(option) {
		this.sellerId = option.sellerId;
		this.loadData()
		storemodel.getSellerInfo({sellerId:this.sellerId},data=>{
			if(data.isCollect==1){
				this.like = true
			}
			this.storeInfo = data
		})
  },
  onReady() {
  
  },
   methods: {
	   //收藏
		keep(letter){
			console.log(letter)
			Likemodel.likeShop(this.sellerId,letter,(data)=>{
	   		this.like=letter
			})
		},
		loadData(){
			storemodel.getShopGoods({sellerId:this.sellerId},(data)=>{
				console.log(data)
				this.list = data;
				this.currentId = this.list[0].id;
			})
		},
		//一级分类点击
		tabtap(item){
			if(!this.sizeCalcState){
				this.calcSize();
			}
			this.slideTop = 'main-'+item.id;
			this.currentId = item.id;
			// let index = this.slist.findIndex(sitem=>sitem.pid === item.id);
			// this.tabScrollTop = this.slist[index].top;
		},
		//右侧栏滚动
		asideScroll(e){
			if(!this.sizeCalcState){
				this.calcSize();
			}
			let scrollTop = e.detail.scrollTop;
			let tabs = this.slist.filter(item=>item.top <= scrollTop).reverse();
			if(tabs.length > 0){
				this.currentId = tabs[0].pid;
			}
		},
		//计算右侧栏每个tab的高度等信息
		calcSize(){
			let h = 0;
			this.slist.forEach(item=>{
				let view = uni.createSelectorQuery().select("#main-" + item.id);
				view.fields({
					size: true
				}, data => {
					item.top = h;
					h += data.height;
					item.bottom = h;
				}).exec();
			})
			this.sizeCalcState = true;
		},
		navToList(id, type){
			console.log(this.sellerId,id,type);
			uni.navigateTo({
				url: `/pages/provide/detail?sellerId=${this.sellerId}&id=${id}&type=${type}`
			})
		},
		toCart(){
			uni.reLaunch({
				url:'/pages/order/order?index=0'
			})
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
			const { data:res } = await this.tim.getConversationProfile(`C2C${this.storeInfo.userId}`)
			console.log(res)
			name = res.conversation.userProfile.nick
			this.$store.commit('updateCurrentConversation',res.conversation)
			this.$store.dispatch('getMessageList')
			uni.navigateTo({
				url:'/pages/msg/chat?toAccount=' + name
			})
		},
		addToCollect(){
			Likemodel.addCollect({sellerId:this.sellerId},data=>{
				this.storeInfo.isCollect = 1
				uni.showToast({
					title:'收藏成功',
					icon:'none',
					duration:1500
				})
			})
		},
		cancelCollect(){
			Likemodel.cancelCollect({sellerId:this.sellerId},data=>{
				this.storeInfo.isCollect = 0
				uni.showToast({
					title:'取消收藏成功',
					icon:'none',
					duration:1500
				})
			})
		}
		
  },
  onReachBottom() { 
    
  }
}
</script>

<style lang="scss">
	page{
		padding-bottom: 110rpx;
	}
	page,
	.content {
		height: 100%;
		background-color: #f2f2f2;     
		.top{
			height: 26%;
			.spacing{
				height: 20rpx;
				background-color: #f8f8f8; 
			}
			.shop-head{
				display: flex;
				padding:30rpx 20rpx;
				image{
					width:120rpx;
					height:120rpx;
					border-radius:10rpx;
					margin-right: 20rpx;
				}
				.main-left{
						width: 580rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;	
						font-size:24rpx;
						font-weight:400;
						color:rgba(160,160,160,1);
						.main-title{
							display: flex;
							justify-content: space-between;						
							.tit{
								font-size:34rpx;
								font-weight:500;
								color:rgba(60,60,60,1);		
								text{
									color: #FFCF27;
									margin-left: 10rpx;
								}	
							}
							.likeImg{
								width:41rpx;
								height:34rpx;
							}
						}
						.iconfont{
							margin-right: 10rpx;
						}
						.address{
							// overflow : hidden;
							// text-overflow: ellipsis;
							// display: -webkit-box;
							// -webkit-line-clamp: 2;
							// -webkit-box-orient: vertical;
							// word-wrap: break-word;
							// word-break: break-all;
						}
					}
				
			}
		}
		.main-scroll {
			margin-top: 20rpx;
			background-color: #fff;
			height: 74%;
			display: flex;
			.left-aside {
				flex-shrink: 0;
				width: 200upx;
				height: 100%;
				background-color: #fff;
			}
			.f-item {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 100upx;
				font-size: 28upx;    
				color: #969696;
				position: relative;
				&.active{
					color: #FF6600;
					background: #f8f8f8;
					&:before{
						content: '';
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
						height: 36upx;
						width: 8upx;
						background-color: #FF6600;
						border-radius: 0 4px 4px 0;
						opacity: .8;
					}
				}
			}
			.right-aside{
				flex: 1;
				overflow: hidden;
				padding-left: 20upx;
			}
			.s-item{
				display: flex;
				align-items: center;
				height: 70upx;
				padding-top: 8upx;
				font-size: 28upx;
				color: #1e1e1e;
			}
			.t-list{
				display: flex;
				flex-wrap: wrap;
				width: 100%;
				background: #fff;
				padding-top: 12upx;
				&:after{
					content: '';
					flex: 99;
					height: 0;
				}
			}
			.t-item{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding-right: 30rpx;
				box-sizing: border-box;
				width: 100%;
				font-size: 26upx;
				color: #666;
				margin-bottom: 30rpx;
				image{
					display: block;
					width: 160upx !important;
					height: 160upx !important;
					margin-right: 20rpx;
				}
				.right_word{
					width: 62%;
					.t_info{
						color:#1e1e1e;
						margin-bottom: 30rpx;
						overflow : hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						word-wrap: break-word;
						word-break: break-all;
					}
					.p_info{
						display: flex;
						justify-content: flex-start;
						align-items: center;
						text{
							color: #FF6600;
							font-size: 34rpx;
						}
						.price_txt{
							color: #FF6600;
							font-size: 34rpx;
							margin-right: 20rpx;
						}
						.receive{
							font-size:24rpx;
							color:#BEBEBE;
						}
					}
				}
			}
		}
	}
	
	.button-group{
		width:100%;
		height:110rpx;
		background-color: #fff;
		position: fixed;
		bottom:0;
		z-index:999999;
		display: flex;
		align-items: center;
		.contact{
			margin-left: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			width:200rpx;
			height:70rpx;
			border:1rpx solid rgba(255,102,0,1);
			border-radius:10rpx;
			margin-right: 40rpx;
			image{
				width:28rpx;
				height:28rpx;
				margin-right: 14rpx;
			}
			view{
				color:#FF6600;
			}
		}
		.cart{
			width:470rpx;
			height:70rpx;
			background:linear-gradient(-90deg,rgba(255,180,0,1),rgba(250,226,67,1));
			border-radius:10rpx;
			font-size:30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color:#fff;
		}
	}
	
	
	
	
	
	
</style>
