<template>
	<view>
		<view class="navigationBar" :class="[displayLink==1?'':'opa']">
			<image src="/static/cut/back_white.png" @tap="toUser()"></image>
			<view>邀请有礼</view>
		</view>
		
		<view class="body" :class="[displayLink==1?'':'opa']" @tap.stop="hideLink()">
			<!-- <view class="title">(每邀请1位好友获得10积分)</view> -->
			<view class="code">
				<image @tap="previewImage(src)" :src="src"></image>
			</view>
			<view class="number">邀请码：{{uerInfo.refereeCode}}</view>
			<button open-type="share">
				<image class="shareLink" src="https://sgz.wdttsh.com/mini_static/cut/invite_person.png" @tap.stop="showLink()"></image>
			</button>
		</view>

	</view>

</template>

<script>
import {mapState} from 'vuex'
export default{
	data(){
		return{
			src:'https://sgz.wdttsh.com/mini_static/minicode.png',
			displayLink:true
		}
	},
	computed: {
		...mapState(['uerInfo'])
	},  
	onShareAppMessage(res){
		return{
			title:'您的朋友邀请您使用天天生活',
			path:'/pages/user/share/share'
		}
	},
	methods:{
		showLink(){
			this.displayLink = false;
		},
		hideLink(){
			this.displayLink = true;
		},
		toUser(){
			uni.switchTab({
				url:'../user'
			})
		},
		previewImage(src){
			uni.previewImage({
				current:src,
				urls:[src]
			})
		}
	}
}
</script>

<style lang="scss">
.navigationBar{
	height:128rpx;
	background:#ff674b;
	position:relative;
	image{
		position: absolute;
		width:20rpx;
		height:34rpx;
		top:67rpx;
		left:20rpx;
	}
	view{
		font-size:36rpx;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:36rpx;
		position: absolute;
		top:67rpx;
		left:300rpx;
	}
}	

.body{
	
	height:1206rpx;
	background: url(https://sgz.wdttsh.com/mini_static/share-bc.png);
	background-size:750rpx 1206rpx;
	position: relative;
	.title{
		position:absolute;
		top:554rpx;
		left:200rpx;
		font-size:28rpx;
		font-weight:400;
		color:rgba(30,30,30,1);
		line-height:36rpx;
	}
	.code{
		position: absolute;
		top:604rpx;
		left:200rpx;
		height:350rpx;
		width:350rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		image{
			width:294rpx;
			height:294rpx;
		}
	}
	.number{
		position: absolute;
		top:984rpx;
		left:236rpx;
		font-size:34rpx;
		font-weight:500;
		color:rgba(30,30,30,1);
		line-height:36rpx;
	}
	button{
		padding:0;
		width:280rpx;
		height:80rpx;
		position: absolute;
		top:1075rpx;
		left:235rpx;
		image{
			width:280rpx;
			height:80rpx;	
		}
	}
	.shareLink{

	}
	// .sharePic{
	// 	width:280rpx;
	// 	height:80rpx;
	// 	position: absolute;
	// 	top:1075rpx;
	// 	left:390rpx;
	// }
	
}

.link{
	position:fixed;
	z-index:99;
	bottom:0;
	width:750rpx;
	height:302rpx;
	background:rgba(236,236,236,1);
	border-radius:20rpx 20rpx 0rpx 0rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;
	button{
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #ECECEC;
		image{
			width:140rpx;
			height:140rpx;
		}
		view{
			margin-top: 19rpx;
			font-size:24rpx;
			font-weight:400;
			color:rgba(60,60,60,1);
			line-height:36rpx;
		}
	}

}



.none{
	display: none;
}

.opa{
	opacity: 0.3;
}
</style>
