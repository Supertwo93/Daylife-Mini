<template>
	<view>
		<view class="topTabBar" :style="{position:headerPosition,top:headerTop}">
			<view class="grid" v-for="(grid,tbIndex) in billType" :key="tbIndex" @tap="showType(tbIndex)" >
				<view class="text" :class="[tbIndex==tabbarIndex?'on':'']">{{grid}}</view>
			</view>
		</view>
		
		<view v-if="tabbarIndex==0" class="unpaid">
			<block v-if="unpaidList.length===0">
				<image class="noBillImage" src="https://sgz.wdttsh.com/mini_static/no-bill.png"></image>
				<view class="noBillText">暂无账单</view>
			</block>
			
			
			
			<view v-for="(item,index) in unpaidList" class="item" :key="index" @tap="toDetail(item)">
				<view class="head">
					<view class='title'>{{item.title}}</view>
					<view class='status'>待支付</view>
				</view>
				<view class="billdetail">
					<image class="billImage" src="https://sgz.wdttsh.com/mini_static/cut/bill-none.png"></image>
					<view class="billBox">
						<view v-if="row.costPrice!=0" v-for="(row,number) in item.costList" :key="number" class="costItem">
							<view class="billName">{{row.costName}}</view>
							<view class="billLine">------------------</view>
							<view class="billCost">￥{{row.costPrice}}</view>
						</view>
					</view>
				</view>
				<view class="billtotal">
					<view class="total">应缴金额：<text>￥{{item.sum}}</text></view>
					<view @tap.stop="toPay(item)" class="billButton">去付款</view>
				</view>
			</view>
		</view>
		<view v-if="tabbarIndex==1" class="unpaid">
			<view v-for="(item,index) in paidList" class="item" :key="index" @tap="toDetail(item)">
				<view class="head">
					<view class='title'>{{item.title}}</view>
					<view class='paidstatus'>已支付</view>
				</view>
				<view class="billdetail">
					<image class="billImage" src="https://sgz.wdttsh.com/mini_static/cut/bill-none.png"></image>
					<view class="billBox">
						<view v-if="row.costPrice!=0" v-for="(row,number) in item.costList" :key="number" class="costItem">
							<view class="billName">{{row.costName}}</view>
							<view class="billLine">------------------------</view>
							<view class="billCost">￥{{row.costPrice}}</view>
						</view>
					</view>
				</view>
				<view class="billedtotal">
					<view class="total">实缴金额：<text>￥{{item.sum}}</text></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {UserModel} from '@/common/models/user.js'
const usermodel = new UserModel()
export default{
	data(){
		return{
			headerPosition:"fixed",
			headerTop:"0px",
			billType: ['未缴账单','已缴账单'],
			tabbarIndex:0,
			unpaidList:[],
			paidList:[]
		}
	},
	onLoad:function(){
		usermodel.queryBill({paymentState:2},data=>{
			this.unpaidList = data
		})
		usermodel.queryBill({paymentState:1},data=>{
			this.paidList = data
		})
		
		
		
		// #ifdef H5
			//定时器方式循环获取高度为止，这么写的原因是onLoad中head未必已经渲染出来。
			let Timer = setInterval(()=>{
				let uniHead = document.getElementsByTagName('uni-page-head');
				if(uniHead.length>0){
					this.headerTop = uniHead[0].offsetHeight+'px';
					clearInterval(Timer);//清除定时器
				}
			},1);
		// #endif
	},
	methods:{
		toDetail(item){
			uni.navigateTo({
				url:'billdetail?billcode=' + item.billCode + '&index=' + this.tabbarIndex
			})
		},
		showType(tbIndex){
			this.tabbarIndex = tbIndex;
			this.list = this.billType[tbIndex];
		},
		toPay(item){
			uni.navigateTo({
				url:'/pages/user/bill/billpay?data=' + JSON.stringify(item)
			})
		}
	}
}
</script>

<style lang='scss'>
page{
	background-color: #f2f2f2;
	padding-bottom: 20rpx;
}
.topTabBar{
	position:fixed;
	z-index: 10;
	top:0;
	width:100%;
	height:64rpx;
	background-color: #fff;
	display: flex;
	justify-content: space-around;
	border-top:1rpx solid #f2f2f2;
	.grid{
		width:20%;
		height:64rpx;
		display:flex;
		justify-content: center;
		align-items: center;
		color:#787878;
		font-size:24rpx;
		.text{
			height:62rpx;
			display: flex;
			align-items: center;
			&.on{
				color:#FF6600;
				border-bottom: solid 2rpx #FF6600;
			}
		}
	}
}

.unpaid{
	margin-top: 84rpx;
	.item{
		border-radius: 30rpx;
		margin-top: 20rpx;
		background-color: #fff;
		padding: 39rpx 19rpx 0 19rpx;
		.head{
			display: flex;
			justify-content:space-between;
			.title{
				font-size:28rpx;
				font-weight:400;
				color:#1E1E1E;
			}
			.status{
				font-size:28rpx;
				font-weight:400;
				color:rgba(255,0,0,1);
			}
		}
		.billdetail{
			display: flex;
			margin-top:39rpx;
			.billImage{
				width:150rpx;
				height:150rpx;
				margin-right: 20rpx;
			}
			.billBox{
				.costItem{
					margin-bottom: 30rpx;
					align-items: center;
					display: flex;
					.billName{
						width:120rpx;
						font-size:26rpx;
						font-family:Source Han Sans CN;
						font-weight:400;
						color:rgba(80,80,80,1);
					}
					.billLine{
						width:330rpx;
						font-size:26rpx;
						font-family:Source Han Sans CN;
						font-weight:400;
						color:rgba(180,180,180,1);
					}
					.billCost{
						color:rgba(80,80,80,1);
					}
				}
				
			}
		}
		.billtotal{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100rpx;
			.total{
				color:#646464;
				font-size:26rpx;
				text{
					font-size:36rpx;
					font-family:Source Han Sans CN;
					font-weight:400;
					color:rgba(30,30,30,1);
				}
			}
			.billButton{
				width:160rpx;
				height:60rpx;
				background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
				border-radius:30rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color:#fff;
			}
		}
	}
}

.billedtotal{
	display: flex;
	justify-content: flex-end;
	align-items: center;
	height: 100rpx;
	.total{
		color:#646464;
		font-size:26rpx;
		text{
			color:#1E1E1E;
			font-size:36rpx;
		}
	}
}
.paidstatus{
	font-size:28rpx;
	font-weight:400;
	color:#8C8C8C;
	line-height:40rpx;
}

.noBillImage{
	width:402rpx;
	height:389rpx;
	margin-left: 170rpx;
	margin-top: 270rpx;
}
.noBillText{
	margin-top: 40rpx;
	margin-left: 320rpx;
	color:rgba(80,80,80,1);
}
</style>
