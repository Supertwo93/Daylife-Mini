<template name="provideTitle">
	<view class="box">
		<view class="top">
			<view class="price"><text>￥{{price}}</text></view>
			<button open-type="share">
				<image class="share" src="https://sgz.wdttsh.com/mini_static/cut/share-icon.png"></image>
			</button>
			
		</view>
		<view class="middle">
			{{title}}
		</view>
		<view class="bottom">
			<view class="common"><text v-if="type==8||type==10">配送费￥</text><text v-if="type==4">办理人数</text><text v-if="type==3||type==9||type==5">已接单</text>{{spec}}</view>
			<view v-if="type!=3&&type!=9" class="common">{{sale}}</view>
			<view class="common">{{disc}}</view>
		</view>
	</view>
</template>

<script>
export default {
	name:'provideTitle',
	props:{
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
		disc:{
			type:String,
			value:''
		},
		sale:{
			type:String,
			value:''
		},
		type:{
			type:String,
			value:''
		}
	},
	data() {
		return {
			
		};
	},
	methods:{
		share(){
			this.$emit('shareLink')
		}
	}
}
</script>

<style lang="scss">
.box{
	background-color: #fff;
	width:750rpx;
	display: flex;
	flex-direction: column;
	// justify-content: space-around;
	.top{
		padding-left:20rpx;
		margin-top: 30rpx;
		display: flex;
		justify-content: space-between;
		.price{
			text{
				color:#FF6600;
				font-size:36rpx;
				margin:0 !important;
			}
		}
		.share{
			width:114rpx;
			height:50rpx
		}
	}
	.middle{
		padding:0 20rpx;
		margin-top: 20rpx;
		font-size:30rpx;
		font-weight:bolder;
		color:#1e1e1e;
		line-height:40rpx;
	}
	.bottom{
		padding:0 20rpx;
		margin-bottom: 30rpx;
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.common{
			font-size:26rpx;
			font-weight:400;
			color:rgba(160,160,160,1);
			line-height:36rpx;
		}
	}
}
</style>
