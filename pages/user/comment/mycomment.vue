<template>
	<view>
		<block v-if="commentList.length==0">
			<image class="image" src="https://sgz.wdttsh.com/mini_static/cut/no_user_comment.png"></image>
			<view class="text">暂无评价</view>
		</block>
		<block v-else>
			<!-- <block v-for="(item,index) in commentList" :key="index"> -->
				<!-- <comment-box :row="item" :margin="true" :button="false" v-on:delete="deleteUserComment(item)">
					<view class="commentInfo">
						<image class="goodImage" :src="item.smallPic"></image>
						<view class="information">
							<view class="title">{{item.title}}</view>
							<view class="price">{{item.price}}</view>
						</view>
					</view>
				</comment-box> -->
				<view v-for="(item,index) in commentList" :key="index" class="item">
					<view class="container">
						<view class="top">
							<image class="icon" :src="item.logoImg"></image>
							<view class="top-left">
								<view class="username">{{item.nickName}}</view>
								<view class="star-point">
									评分
									<block v-for="(img,num) in starIndex" :key="num">
										<image :src="item.goodScore>num?src[0]:src[1]"></image>
									</block>
								</view>
							</view>
							<!-- <view class="time">{{item.createTime}}</view> -->
						</view>
						<view class="middle">
							<text class="spec">#{{item.spec}}#</text>
							<text>{{item.content}}</text>
						</view>
						<view class="bottom">
							<block v-if="item.img.length==2||item.img.length==1">
								<image :src="item.img[0]" class="img1"></image>
							</block>
							<block v-if="item.img.length>2">
								<image :src="image" v-for="(image,idx) in item.img" :key="idx" class="img2"></image>
							</block>
						</view>
						<view class="linkBox" @tap="toDetail(item)">
							<image :src="item.smallPic"></image>
							<view class="link-detail">
								<view class="link-title">{{item.title}}</view>
								<view class="link-price">￥{{item.price}}</view>
							</view>
						</view>
						<view class="other">
							<view class="time">{{item.createTime}}</view>
							<view @tap.stop="deleteUserComment(item)" class="delete-btn">删除评价</view>
						</view>
					</view>
					
				</view>
			<!-- </block> -->
		</block>
		
	</view>
</template>

<script>
import commentBox from '@/components/commentBox.vue'
import {UserModel} from '@/common/models/user.js'
const usermodel = new UserModel()
export default{
	components: {
		commentBox
	},
	data(){
		return{
			// starOff:'/static/cut/star_off.png',
			// starOn:'/static/cut/star_on.png',
			// starList:[0,1,2,3,4],
			commentList:[],
			starIndex:[0,1,2,3,4],
			src:['/static/cut/comment-star.png','/static/cut/commnet-star-dowm.png']
		}
	},
	onLoad(){
		usermodel.getUserComment((data)=>{
			console.log(data)
			this.commentList = data.goodCommentList
			for(let i of this.commentList){
				if(i.img==null){
					i.img = []
				}else{
					i.img = i.img.split(',')
				}
			}
			console.log(this.commentList)
		})
	},
	methods:{
		deleteUserComment(item){
			uni.showModal({
				content: '是否确认删除该评价，该操作不可撤回',
				success: (res) => {
					if(res.confirm){
						usermodel.deleteUserComment({commentIds:item.commentId},(data)=>{
							usermodel.getUserComment((data)=>{
								this.commentList = data.goodCommentList
								uni.showToast({
									title:'删除评价成功',
									icon:'none',
									duration:1500
								})
							})
						})
					}
				}
			})
			
			
			
			
			
			
		},
		toDetail(item){
			if(item.firsttypeId==1){
				uni.navigateTo({
					url:`detail?sellerId=${item.sellerId}&id=${item.goodsId}&type=${item.firsttypeId}`
				})
			}else if(item.firsttypeId==5){
				uni.navigateTo({
					url:'financedetail?financeId=' + item.id + '&code=' + item.financeCode + '&sellerId=' + item.sellerId
				})
			}else if(item.firsttypeId!=1&&item.firsttypeId!=5){
				uni.navigateTo({
					url:`/pages/provide/detail?sellerId=${item.sellerId}&id=${item.goodsId}&type=${item.firsttypeId}`
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
.image{
	margin-top: 271rpx;
	margin-left: 174rpx;
	width:402rpx;
	height:389rpx;
}
// 
// .commentInfo{
// 	padding:0 20rpx;
// 	height:130rpx;
// 	display: flex;
// 	background-color: #FAFAFA;
// 	.goodImage{
// 		width:130rpx;
// 		height:130rpx;
// 	}
// 	.information{
// 		margin-left: 20rpx;
// 		display: flex;
// 		flex-direction: column;
// 		justify-content: space-around;
// 		.title{
// 			
// 		}
// 		.price{
// 			
// 		}
// 	}
// }
// 
.text{
	margin-top: 40rpx;
	margin-left: 320rpx;
}


.item{	
		margin-top: 10rpx;
		background-color: #fff;
		padding:20rpx;
		display: flex;
		.icon{
			width:64rpx;
			height:64rpx;
			border-radius:50%;
			margin-right: 15rpx;
		}
		.container{
			.top{
				display: flex;
				height:64rpx;
				align-items:center;
				.top-left{
					.username{
						color:rgba(30,30,30,1);
					}
					.star-point{
						display: flex;
						align-items: center;
						image{
							margin-left: 8rpx;
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
			.middle{
				width:100%;
				margin-top:30rpx;
				margin-bottom: 25rpx;
				.spec{
					font-size:28rpx;
					color:#ff6600;
				}
			}
			.bottom{
				display: flex;
				flex-wrap: wrap;
				.img1{
					width:280rpx;
					height:280rpx;
				}
				.img2{
					margin-right: 15rpx;
					margin-bottom: 10rpx;
					width:190rpx;
					height:190rpx;
				}
			}
		}
		.linkBox{
			width:710rpx;
			height:130rpx;
			background:rgba(250,250,250,1);
			display: flex;
			image{
				width:130rpx;
				height:130rpx;
				margin-right: 20rpx;
			}
			.link-detail{
				width:520rpx;
				.link-title{
					margin-top: 20rpx;
					color:#1E1E1E;
					overflow : hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					word-wrap: break-word;
					word-break: break-all;
				}
				.link-price{
					margin-top: 30rpx;
					font-weight:500;
					color:rgba(60,60,60,1);
				}
			}
		}
		.other{
			margin-top: 10rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.time{
				color:#1E1E1E;
			}
			.delete-btn{
				color:#646464;
				text-align: center;
				line-height: 60rpx;
				width:160rpx;
				height:60rpx;
				background:rgba(255,255,255,1);
				border:1rpx solid rgba(200,200,200,1);
				border-radius:30rpx;
			}
		}
	}
</style>
