<template>
	<view>
		<block v-if="commentList.length!=0">
			<block v-for="(item,index) in commentList.goodCommentList" :key="index">
				<comment-box :row="item" :margin="true" :button="false" v-on:delete="deleteUserComment(item)">
					<view class="commentInfo">
						<image class="goodImage" :src="item.smallPic"></image>
						<view class="information">
							<view class="title">{{item.title}}</view>
							<view class="price">{{item.price}}</view>
						</view>
					</view>
				</comment-box>
			</block>
		</block>
		<block v-if="commentList.length==0">
			<image class="image" src="https://sgz.wdttsh.com/mini_static/cut/no_user_comment.png"></image>
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
			starOff:'/static/cut/star_off.png',
			starOn:'/static/cut/star_on.png',
			starList:[0,1,2,3,4],
			commentList:{}
		}
	},
	onLoad(){
		usermodel.getUserComment((data)=>{
			this.commentList = data
			console.log(this.commentList)
		})
	},
	methods:{
		deleteUserComment(item){
			usermodel.deleteUserComment({commentIds:item.commentId},(data)=>{
				usermodel.getUserComment((data)=>{
					this.commentList = data
				})
			})
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

.commentInfo{
	padding:0 20rpx;
	height:130rpx;
	display: flex;
	background-color: #FAFAFA;
	.goodImage{
		width:130rpx;
		height:130rpx;
	}
	.information{
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		.title{
			
		}
		.price{
			
		}
	}
}
</style>
