<template>
	<view>
		<bavigationbar></bavigationbar>
		<view v-if="data.length==0" class="noGoods">
			<image src="https://sgz.wdttsh.com/mini_static/cut/noSearchRecord.png"></image>
			<view>无相关搜索商品，换个词试试吧</view>
		</view>
		
		<view v-else class="goods">
			<block v-for="(item,index) in data" :key="index">
				<block v-if="item.type==1">
					<view class="store_box" @tap="toStore(item)">
						<image class="logo" :src="item.logoPic"></image>
						<view class="detail">
							<view class="title">{{item.suggest}}</view>
							<view class="middle">
								<view class="point">
									<image src="/static/cut/comment-star.png"></image>
									<view>{{item.mainScore}}</view>
								</view>
								<view class="sell">
									总售{{item.monthlySale}}
								</view>
								<view class="dis">{{item.distance|fixOne}}km</view>
							</view>
							<view class="bottom">
								<view class="tags">
									<view v-if="item.firstTypeId==8&&item.deliveryFee==0" class="y-tag">免费配送</view>
									<view class="tag">商品{{item.goodsCount}}</view>
									<view v-if="item.firstTypeId==8" class="tag">商品{{item.startingAndDeliveringFee}}</view>
								</view>
								<view class="in">
									<view>进店</view>
									<image src="/static/cut/right_orange.png"></image>
								</view>
							</view>
						</view>
					</view>
					
				</block>
				
				<block v-if="item.type==2">
					<block v-if="item.goodsFirsttype==8||item.goodsFirsttype==10">
						<item-list :src="item.smallPic" :money="item.price" 
						:title="item.suggest" :deliver="item.postFee" :sales="item.monthSale"
						@tap="toDetail(item)" v-on:addcart="addToCart(item)" :distance="item.distance|fixOne"></item-list>
					</block>
					<block v-if="item.goodsFirsttype==3||item.goodsFirsttype==9">
						<item-service :src="item.smallPic" :money="item.price" 
						:title="item.suggest" :deliver="item.postFee" :sales="item.monthSale"
						:distance="item.distance|fixOne" @tap="toDetail(item)"></item-service>
					</block>
					<block v-if="item.firsttypeId==1">
						<item-service :isHouse="true" :src="item.src" :title="item.suggest" @tap='toDetail(item)' :distance='item.distance|fixOne'
						:money="item.price" :desc="item|meterFilter"></item-service>
					</block>
					<block v-if="item.firstTypeId==5">
						<item-service :src="item.src" :title="item.suggest"
						:money="item.price" :monthSale="item.monthSale" @tap="toDetail(item)"
						:distance="item.distance|fixOne"></item-service>
					</block>
				</block>
			</block>
			
			
			
			<!-- <block v-if="type==8||type==10">
				<block v-for="(item,index) in data" :key="index">
					<item-list :src="item.smallPic" :money="item.price" 
					:title="item.suggest" :deliver="item.postFee" :sales="item.monthSale"
					@tap="toDetail(item)" v-on:addcart="addToCart(item)" :distance="item.distance|fixOne"></item-list>
				</block>
			</block>
			
			<block v-if="type==3||type==9">
				<block v-for="(item,index) in data" :key="index">
					<item-service :src="item.smallPic" :money="item.price" 
					:title="item.goodsName" :deliver="item.postFee" :sales="item.monthSale"
					:distance="item.distance|fixOne" @tap="toDetail(item)"></item-service>
				</block>
			</block>
			<block v-if="type==8||type==10">
				<block v-for="(item,index) in data" :key="index">
					<item-list :src="item.smallPic" :money="item.price" 
					:title="item.goodsName" :deliver="item.postFee" :sales="item.monthSale"
					@tap="toDetail(item)" v-on:addcart="addToCart(item)" :distance="item.distance|fixOne"></item-list>
				</block>
			</block>
			<block v-if="type==1">
				<block v-for="(row,number) in data" :key="number">
					<item-service :isHouse="true" :src="row.src" :title="row.title" @tap='toDetail(number)' :distance='row.distance|fixOne'
					:money="row.price" :desc="row|meterFilter"></item-service>
				</block>
			</block>
			<block v-if="type==5">
				<block v-for="(row,number) in data" :key="number">
					<item-service :src="row.src" :title="row.title"
					:money="row.price" :desc="row.loan_rates" @tap="toDetail(row)"
					:distance="row.distance|fixOne"></item-service>
				</block>
			</block>
			
			<block v-if="type==''">
				<block v-for="(item,index) in data" v-if="item.goodsFirsttype==3||item.goodsFirsttype==9" :key="index">
					<item-service :src="item.smallPic" :money="item.price" :monthSale="item.monthSale"
					:title="item.suggest" :deliver="item.postFee" :sales="item.monthSale"
					:distance="item.distance|fixOne" @tap="toDetail(item)"></item-service>
				</block>
				<block v-for="(item,index) in data" v-if="item.goodsFirsttype==8||item.goodsFirsttype==10" :key="index">
					<item-list :src="item.smallPic" :money="item.price" 
					:title="item.suggest" :deliver="item.postFee" :sales="item.monthSale"
					@tap="toDetail(item)" v-on:addcart="addToCart(item)" :distance="item.distance|fixOne"></item-list>
				</block>
			</block> -->
		</view>
	</view>
</template>

<script>
	import bavigationbar from "@/components/bavigation-bar.vue"
	import itemList from '@/components/item-list.vue'
	import itemService from '@/components/item-service.vue'
	import {IndexModel} from '@/common/models/index.js'
	const indexmodel = new IndexModel()
	import {mapState} from 'vuex'
	import {HouseModel} from "@/common/models/house.js"
	let housemodel = new HouseModel()
	import {FinanceModel} from '@/common/models/finance.js'
	const financemodel = new FinanceModel()
	export default{
		filters: {
			// titleFormat: function(title) {
			// 	if(title.length>25){
			// 		return title.substring(0,25) + '...'
			// 	}else{
			// 		return title
			// 	}
			// },
			fixOne(value){
				return parseInt(value/1000).toFixed(1)
			},
			meterFilter(value){
				if(value.hasOwnProperty('squareMetre')){
					return value.squareMetre + '㎡'
				}else{
					return '暂无'
				}
			}
		},
		components:{
			bavigationbar,
			itemList,
			itemService
		},
		computed:{
			...mapState(['lat','lon'])
		},
		data(){
			return{
				type:'',
				key:'',
				pageNo:1,
				data:'',
				req:{
					pageNo:1,
					pageSize:10,
					title:'',
					type:'',
					goodsFirsttype:'',
					latitude:'',
					longitude:''
				}
			}
		},
		onLoad(options){
			if(options.text==1){
				this.req.type = 1
			}
			this.type = options.type
			this.req.goodsFirsttype = options.type
			this.key = options.key
			this.req.title = this.key
			this.req.latitude = this.lat
			this.req.longitude = this.lon
			indexmodel.searchAll(this.req,data=>{
				let reqData = data
				for(let i of reqData){
					if(i.type==2&&(i.firsttypeId==1||i.firstTypeId==5)){
						i.src = i.picture.split(',')[0]
					}
				}
				this.data = reqData
				console.log(this.data)
				
			})
			
		},
		onReachBottom(){
			this.req.pageNo++
			indexmodel.searchAll(this.req,data=>{
				let reqData = data
				for(let i of reqData){
					if(i.type==2&&(i.firsttypeId==1||i.firstTypeId==5)){
						i.src = i.picture.split(',')[0]
					}
				}
				this.data = this.data.concat(reqData)
			})
		},
		methods:{
			toDetail(item){
				if(item.firsttypeId==1){
					uni.navigateTo({
						url:'/pages/house/housedetail?data='+item.id
					})
				}else if(item.firstTypeId==5){
					uni.navigateTo({
						url:'/pages/finance/financedetail?financeId=' + item.id + '&code=' + item.financeCode + '&sellerId=' + item.sellerId
					})
				}else{
					uni.navigateTo({
						url:`/pages/provide/detail?sellerId=${item.sellerId}&id=${item.id}&type=${item.goodsFirsttype}`
					})
				}
				
			},
			toStore(item){
				if(item.firstTypeId==1){
					uni.navigateTo({
						url:`/pages/shop/storeindex?sellerId=${item.sellerId}&type=1`
					})
				}else if(item.firstTypeId==5){
					uni.navigateTo({
						url:'/pages/shop/storeindex?sellerId=' + item.sellerId
					})
				}else{
					uni.navigateTo({
						url:'/pages/shop/shop?sellerId=' + item.sellerId
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f2f2f2;
	}
	.noGoods{
		image{
			width:402rpx;
			height:389rpx;
			margin-top: 274rpx;
			margin-left: 174rpx;
		}
		view{
			margin-left: 204rpx;
			margin-top: 40rpx;
		}
	}
	
	.store_box{
		border-radius: 30rpx;
		margin-top:10rpx;
		background-color: #fff;
		width:750rpx;
		height:190rpx;
		padding:20rpx;
		display: flex;
		justify-content: space-between;
		.logo{
			width:150rpx;
			height:150rpx;
			border-radius: 10rpx;
		}
		.detail{
			width:520rpx;
			height:150rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 20rpx;
			.title{
				font-size:30rpx;
				color:#1e1e1e;
				overflow: hidden;
				-o-text-overflow: ellipsis;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				word-wrap: break-word;
				word-break: break-all;

			}
			.middle{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.point{
					display: flex;
					align-items: center;
					image{
						margin-right: 5rpx;
						width:25rpx;
						height:25rpx;
					}
					view{
						font-size:30rpx;
						color:#FFC600;
						font-weight:700;
					}
				}
			}
			.bottom{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.tags{
					display: flex;
					.tag{
						margin-right: 10rpx;
						font-size: 22rpx;
						height: 30rpx;
						line-height: 30rpx;
						padding: 0 5rpx;
						color: #a0a0a0;
						border: 1rpx solid #a0a0a0;
						border-radius: 6rpx;
					}
					.y-tag{
						margin-right: 10rpx;
						font-size: 22rpx;
						height: 30rpx;
						line-height: 30rpx;
						padding: 0 5rpx;
						color: #ff6600;
						border: 1rpx solid #ff6600;
						border-radius: 6rpx;
					}
				}
				.in{
					display: flex;
					align-items: center;
					color:#ff6600;
					image{
						margin-left: 5rpx;
						width:8rpx;
						height:16rpx;
					}
				}
			}
		}
	}
</style>
