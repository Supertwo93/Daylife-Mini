<template>
	<view>
		<bavigationbar></bavigationbar>
		<swiper style="height:200rpx;" :swiperImage="swiperImage"></swiper>
		<view class="indexChooseType">
			<view class="main-title">{{title}}服务</view>
			<!-- <view class="icon" @tap="pop()">
				筛选<image src="/static/cut/filter_icon.png"></image>
			</view> -->
		</view>
		<block v-for="(item,index) in data" :key="index">
			<item-service :isVIP="true" :monthSale="item.stock" :distance="item.distance|fixOne" :src="item.carPic" :title="item.title" :type="item.cardType" :money="item.price" :desc="'办理人数：' + item.totalSale" @tap='toDetail(index)'></item-service>
		</block>
	</view>
</template>

<script>
	import bavigationbar from "@/components/bavigation-bar.vue"
	import Swiper from "@/components/Swiper.vue"
	import itemService from '@/components/item-service.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import {VipModel} from '../../common/models/vip.js'
	let vipmodel = new VipModel()
	import {mapState} from 'vuex'
	export default {
		components:{
			bavigationbar,
			Swiper,
			itemService,
			uniLoadMore,
		},
		filters: {
			fixOne(value){
				return parseFloat(value/1000).toFixed(1)
			}
		},
		data() {
			return {
				data:'',
				swiperImage:[],
				title:''
			}
		},
		computed:{
			...mapState(['hasLogin','lat','lon'])
		},
		onLoad(options){
			this.title = options.title
			vipmodel.getVipList({longitude:this.lon,latitude:this.lat},(data)=>{
				console.log(data)
				this.data = data
			})
			vipmodel.getSwiperImage((data)=>{
				for(let i = 0;i<data.length;i++){
					this.swiperImage.push(data[i].coverImg)
				}
			})
			
		},
		methods: {
			toDetail(index){
				uni.navigateTo({
					url:'vipdetail?id=' + this.data[index].id + '&sellerId=' + this.data[index].sellerId
				})
			}
		}
	}
</script>

<style>
page{
	background-color: #f2f2f2;
}

.main-title{
	font-size:34rpx;
	font-weight:bold;
	color:rgba(30,30,30,1);
}
</style>
