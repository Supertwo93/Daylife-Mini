<template>
	<view>
		<view class="content">
			<view class="list">
				<view class="row" v-for="(row,index) in addressList" :key="index" @tap="select(row)">
					<view class="left">
						<view class="head">
							{{row.receiverName || " " | capitalize}}
						</view>
					</view>
					<view class="center">
						<view class="name-tel">
							<view class="name">{{row.receiverName}}</view>
							<view class="tel">{{row.receiverPhone}}</view>
							<view class="default" v-if="row.setDefaultAddress==1">
								默认
							</view>
						</view>
						<view class="address">
							{{row.receiverProvince}} {{row.receiverCity}} {{row.receiverDistrict}} {{row.receiverAddress}}
						</view>
					</view>
					<view class="right">
						<view class="icon iconfont icon-bianji" @tap.stop="edit(row)">
							
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="add">
			<view class="btn" @tap="add">
				<view class="icon tianjia"></view>新增地址
			</view>
		</view>
	</view>
</template>
<script>
	import {AddressModel} from '@/common/models/address.js'
	let addressModel=new AddressModel()
	export default {
		data() {
			return {
				isSelect:false,
				addressList:[]
			};
		},
		onLoad(e) {
			this.list()
			if(e.type=='select'){
				this.isSelect = true;
			}	
		},
		filters:{
			capitalize(value){
				return value.substr(0,1) 
			}
		},
		onShow() {
			this.list()
		},
		methods:{
			list(){
				addressModel.getByUserIdAddr((data)=>{
					console.log(data)
					this.addressList=data
				})
			},
			edit(row){
				uni.setStorage({
					key:'address',
					data:row,
					success() {
						uni.navigateTo({
							url:"edit/edit?type=1"
						})
					}
				});
				
			},
			add(){
				uni.navigateTo({
					url:"edit/edit?type=0"
				})
			},
			select(row){
				//是否需要返回地址(从订单确认页跳过来选收货地址)
				if(!this.isSelect){
					return ;
				}
				uni.setStorage({
					key:'selectAddress',
					data:row,
					success() {
						uni.navigateBack();
					}
				})
			}
		}
	}
</script>

<style lang="scss">
view{
	display: flex;
}
	.icon {
		// &.bianji {
		// 	&:before{content:"\e61b";}
		// }
		// &.tianjia {
		// 	&:before{content:"\e81a";}
		// }
	}
	.add{
		position: fixed;
		bottom: 10rpx;
		width: 100%;
		height: 120upx;
		justify-content: center;
		align-items: center;
		.btn{
			width: 70%;
			height: 80upx;
			border-radius: 80upx;
			background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
			color: #fff;
			justify-content: center;
			align-items: center;
			.icon{
				height: 80upx;
				color: #fff;
				font-size: 30upx;
				justify-content: center;
				align-items: center;
			}
			font-size: 30upx;
		}
	}
	.list{
		flex-wrap: wrap;
		.row{
			width: 96%;
			padding: 20upx 2%;
			.left{
				width: 90upx;
				flex-shrink: 0;
				align-items: center;
				.head{
					width: 70upx;
					height: 70upx;
					background:linear-gradient(to right,#ccc,#aaa);
					color: #fff;
					justify-content: center;
					align-items: center;
					border-radius: 60upx;
					font-size: 35upx;
				}
			}
			.center{
				width: 100%;
				flex-wrap: wrap;
				.name-tel{
					width: 100%;
					align-items: baseline;
					.name{
						font-size: 34upx;
					}
					.tel{
						margin-left: 30upx;
						font-size: 24upx;
						color: #777;
					}
					.default{

						font-size: 22upx;
						background:linear-gradient(90deg,rgba(255,145,48,1),rgba(255,102,0,1));
						color: #fff;
						padding: 0 18upx;
						border-radius: 24upx;
						margin-left: 20upx;
					}
				}
				.address{
					width: 100%;
					font-size: 24upx;
					align-items: baseline;
					color: #777;
				}
			}
			.right{
				flex-shrink: 0;
				align-items: center;
				margin-left: 20upx;
				.icon{
					justify-content: center;
					align-items: center;
					width: 80upx;
					height: 60upx;
					border-left: solid 1upx #aaa;
					font-size: 40upx;
					color: #777;
				}
			}
		}
	}
</style>
