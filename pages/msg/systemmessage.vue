<template>
	<view>
		<block v-if="list.length===0">
			<image class="noImg" src="https://sgz.wdttsh.com/mini_static/cut/mess_bg.png"></image>
			<view class="noText">暂无系统消息</view>
		</block>
		<block v-else>
			<view @tap="toDetail(item)" v-for="(item,index) in list" :key="index" class="item">
				<view class="title">{{item.title}}</view>
				<image src="https://sgz.wdttsh.com/mini_static/cut/black-arrow.png"></image>
			</view>
		</block>
	</view>
</template>




<script>
	import {UserModel} from '@/common/models/user.js'
	const usermodel = new UserModel()
	export default{
		data(){
			return{
				queryInfo:{
					pageNo:1,
					pageSize:10
				},
				list:[]
			}
		},
		onLoad(){
			this.getList()
		},
		methods:{
			getList(){
				usermodel.getSystemMessageList(this.queryInfo,data=>{
					this.list = data
					
				})
			},
			toDetail(item){
				let data = item.content.substring(item.content.indexOf('<div>'),item.content.indexOf('</body'))
				uni.navigateTo({
					url:`/pages/msg/systempage?data=${data}`
				})
			}
			
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}

.noImg{
	width:402rpx;
	height:389rpx;
	margin-top: 271rpx;
	margin-left: 174rpx;
}

.noText{
	margin-top: 40rpx;
	margin-left: 292rpx;
}

.item{
	padding:0 20rpx;
	border-bottom: 1rpx solid #f2f2f2;
	height:105rpx;
	display: flex;
	background-color: #fff;
	justify-content: space-between;
	align-items: center;
	view{
		color:#1E1E1E;
	}
	image{
		width:12rpx;
		height:19rpx;
	}
}



</style>
