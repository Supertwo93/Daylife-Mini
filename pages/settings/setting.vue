<template>
	<view>
		<view class="defaultTitle">服务</view>
		
		<view class="topContainer">
			<view class="container" @tap="toHelp()">
				使用帮助
				<view class="iconfont icon-dibudaohanglan-"></view>
			</view>
			<view class="container" @tap="toChat()">
				客服中心
				<view class="iconfont icon-dibudaohanglan-"></view>
			</view>
			<view class="container" @tap="toAboutus()">
				关于我们
				<view class="iconfont icon-dibudaohanglan-"></view>
			</view>
			<view class="container none" @tap="toSuggestion()">
				意见反馈
				<view class="iconfont icon-dibudaohanglan-"></view>
			</view>
		</view>
	
		<view class="defaultTitle">通用</view>
		
		<view class="topContainer">
			<!-- <view class="container" @tap="toHelp()">
				当前版本
				<view class="iconfont icon-dibudaohanglan-"></view>
			</view> -->
			<view class="container none" @tap="clearStorage()">
				清除缓存
				<view class="iconfont icon-dibudaohanglan-"></view>
			</view>
		</view>
		
		<view class="submit-button" @click="logOut()">退出登录</view>
		
	</view>
</template>

<script>
	import {UserModel} from "../../common/models/user.js"
	let userModel=new UserModel()
	import {mapState,mapMutations} from 'vuex';  
export default{
	data(){
		return{
			serviceId:'',
			serviceNickname:''
		}
	},
	onLoad(){
		let that = this
		uni.request({
			url:'https://sgz.wdttsh.com/app/systemparam/getServiceInfo',
			method:'POST',
			success(res){
				that.serviceId = res.data.data.serviceId
				that.serviceNickname = res.data.data.serviceNickname
			}
		})
	},
	methods:{
		...mapMutations(["logout"]),
		logOut(){
			this.$api.tip({
				title: '提示',
				content: '确认退出登录',
				cb_confirm:()=>{
					userModel.getLogout((data)=>{
						this.logout();
						uni.navigateBack({
							delta: 1
						})
					})
				},
				cb_cancel:()=>{
					
				}
			})
		},
		toHelp(){
			uni.navigateTo({
				url:'help'
			})
		},
		toAboutus(){
			uni.navigateTo({
				url:'aboutus'
			})
		},
		toSuggestion(){
			uni.navigateTo({
				url:'suggestion'
			})
		},
		clearStorage(){
			uni.showToast({
				title:'清除成功',
				icon:'none',
				duration:1500
			})
		},
		toChat(){
			this.$store.commit('resetCurrentConversation')
			this.$store.commit('resetGroup')
			this.tim.getConversationProfile(`C2C${this.serviceId}`)
				.then((res) => {
					this.$store.commit('updateCurrentConversation',res.data.conversation)
					this.$store.dispatch('getMessageList')
				}) 
			uni.navigateTo({
				url:"/pages/msg/chat?toAccount="+ this.serviceNickname
			})
		}
	}
}
</script>

<style lang="scss">
page{
	background-color: #f2f2f2;
}



.none{
	border:none !important;
}
</style>
