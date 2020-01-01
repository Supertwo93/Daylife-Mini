<template>
	<view>
		<view>
			<rich-text :nodes="data"></rich-text>
		</view>
		
		<view :class="[isRead ? 'submit-button' : 'disable']" @tap="backToSign">我已阅读并确认</view>
	</view>
</template>

<script>
import {HouseModel} from '@/common/models/house.js'
const housemodel = new HouseModel()
export default{
	data(){
		return{
			data:'',
			isRead:false
		}
	},
	methods:{
		backToSign(){
			if(this.isRead==0){
				uni.showToast({
					title:'请阅读合同后点击确定按钮',
					icon:'none',
					duration:2000
				})
			}else{
				let pages = getCurrentPages()
				let prePages = pages[pages.length-2]
				// #ifdef MP
				prePages.$vm.isContract = true
				// #endif
				uni.navigateBack({
					
				})
			}
			
		}
	},
	onLoad:function(options){
		let url = ''
		if(options.type=='金融'){
			let that = this
			let req = {}
			req.financeCode  = options.code
			req.type = 1
			uni.request({
				url:'https://sgz.wdttsh.com/app/financialContracts/queryFinancialContract',
				data:req,
				method:'POST',
				header: {
					'content-type':'application/x-www-form-urlencoded'		 
				},
				success(res){
					that.data = res.data.substring(res.data.indexOf('<body>')+6,res.data.indexOf('</body>'))
				}
			})
		}else{
			let that = this
			let req = {}
			req.releaseId = options.id
			req.type = 1
			uni.request({
				url:'https://sgz.wdttsh.com/app/signing/queryContract',
				data:req,
				method:'POST',
				header: {
					'content-type':'application/x-www-form-urlencoded'		 
				},
				success(res){
					that.data = res.data.substring(res.data.indexOf('<div'),res.data.indexOf('</div>'))
				}
			})
		}
	},
	onReachBottom(){
		this.isRead = true
	}
}
	
</script>

<style>
page{
	padding-bottom:96rpx;
}
.disable{
	background-color: #b4b4b4;
	width:100%;
	height:96rpx;
	position:fixed;
	bottom:0;
	text-align: center;
	font-size:34rpx;
	line-height:96rpx;
	font-weight:400;
	color:rgba(255,255,255,1);
}

</style>
