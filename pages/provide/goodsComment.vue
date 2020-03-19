<template>
	<view>
		<view v-for="(item,index) in comment" :key="index" class="item">
			<image class="icon" :src="item.logoImg"></image>
			<view class="container">
				<view class="top">
					<view class="top-left">
						<view class="username">{{item.nickName}}</view>
						<view class="star-point">
							评分
							<block v-for="(img,num) in starIndex" :key="num">
								<image :src="item.goodScore>num?src[0]:src[1]"></image>
							</block>
						</view>
					</view>
					<view class="time">{{item.createTime}}</view>
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
						<image :src="image" v-for="(image,idx) in item.img" class="img2"></image>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default{

	data(){
		return{
			comment:'',
			starIndex:[0,1,2,3,4],
			src:['/static/cut/comment-star.png','/static/cut/commnet-star-dowm.png']
		}
	},
	onLoad(options){
		
		this.comment = JSON.parse(options.data)
		for(let i of this.comment){
			if(i.img==null){
				i.img = []
			}else{
				i.img = i.img.split(',')
			}
			
		}
		console.log(this.comment)
	}
}
</script>

<style lang="scss">
	page{
		background-color: #f2f2f2;
	}
	
	.item{
		margin-bottom: 5rpx;
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
			width:630rpx;
			.top{
				display: flex;
				height:64rpx;
				align-items:center;
				justify-content: space-between;
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
	}
</style>
