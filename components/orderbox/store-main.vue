<template name="storeMain">
	<view class="box">
		<image :src="pic"></image>
		<view class="content">
			<view class="detail">
				<view class="title">{{title}}</view>
				<view class="price">{{price}}</view>
			</view>
			<view class="detail">
				<view class="gray">{{specsize}}</view>
				<view class="gray">{{spec}}</view>
			</view>
			<slot />
		</view>
	</view>
</template>

<script>
export default {
	name:'storeMian',
	props:{
		pic:{
			type:String,
			value:''
		},
		price:{
			type:String,
			value:''
		},
		title:{
			type:String,
			value:''
		},
		spec:{
			type:String,
			value:''
		},
		specsize:{
			type:String,
			value:''
		},
		disc:{
			type:String,
			value:''
		}
	},
	data() {
		return {
			
		};
	}
}
</script>

<style lang="scss">
.box{
	margin-top: 10rpx;
	background-color: #fff;
	display: flex;
	image{
		width:150rpx;
		height:150rpx;
		border-radius:10rpx;
	}
	.content{
		margin-left: 20rpx;
		width:550rpx;
		.detail{
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			.title{
				color:#1e1e1e;
				font-size:28rpx;
			}
		}	
	}
}
</style>
