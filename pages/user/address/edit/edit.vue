<template>
	<view>
		<view class="item">
			<input v-model="name" placeholder="联系人" />
		</view>
		<view class="item">
			<input v-model="tel" placeholder="联系电话" />
		</view>
		<view class="item" @tap="chooseCity()">
			<view>
				<text v-if="receiverProvince==''">所在地区</text>
				{{receiverProvince}}
				{{receiverCity}}
				{{receiverDistrict}}
			</view>
		</view>
		<textarea v-model="detailed" placeholder="详细地址:楼栋号,门牌号等"></textarea>
		
		<view class="settingDefault">
			<view>设置为默认地址</view>
			<image @tap="choooseDefault" :src="isDefault?src[1]:src[0]"></image>
		</view>
		
		<view class="delete" v-if="editType==1" @tap="del">
			删除收货地址
		</view>
		
		<view @tap="save" class="submit-button">保存</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import {AddressModel} from '@/common/models/address.js'
	let addressModel=new AddressModel()
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				array: ['中国大陆+86', '香港+852', '澳门+853', '台湾+886'],
				index: 0,
				arrayvalue:86,
				editType:null,
				id:'',
				name:'',
				tel:'',
				detailed:'',
				isDefault:0,
				isselec:0,
				receiverProvince:'',
				receiverCity:'',
				receiverDistrict:'',
				cityPickerValue: [0, 0, 1],
				themeColor: '#000',
				region:{label:"请点击选择地址",value:[],cityCode:""},
				src:['/static/cut/unchoose.png','/static/cut/choosed.png']
			};
		},
		onLoad(e) {
			//获取传递过来的参数
			
			this.editType = e.type;
			if(e.type==1){
				uni.getStorage({
					key:'address',
					success: (e) => {
						console.log(e)
						this.id = e.data.receiverAddressId;
						this.name = e.data.receiverName;
						this.tel = e.data.receiverPhone;
						this.detailed = e.data.receiverAddress;
						this.isDefault = Number(e.data.setDefaultAddress) ? 1 :0;
						this.receiverProvince =e.data.receiverProvince
						this.receiverDistrict=e.data.receiverDistrict
						this.receiverCity=e.data.receiverCity
						//this.cityPickerValue = e.data.address.region.value;
						//this.region.label = e.data.receiverProvince+e.data.receiverDistrict+e.data.receiverCity;
					}
				})
			}
			
		},
		methods: {
			 bindPickerChange: function(e) {
			    //this.index = e.target.value
				this.arrayvalue=this.array[e.target.value].split("+")[1]
			},
			onCancel(e) {
				console.log(e)
			},
			chooseCity() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.region = e;
				this.cityPickerValue = e.value;
				console.log(e)
				let add=e.label.split("-")
				for(let i=0;i<add.length;i++){
					if(i==0){
						this.receiverProvince=add[i]  
					}else if(i==1){
						this.receiverCity=add[i]
					}else{
						this.receiverDistrict =add[i]
					}
				}
			},
			isDefaultChange(e){
				if(e.detail.value){
					this.isselec=1
				}else{
					this.isselec=0
				}
				//this.isDefault = e.detail.value;
			},
			del(){
				this.$api.tip({
					title: '删除提示',
					content: '你将删除这个收货地址',
					cb_confirm:()=>{
						addressModel.deleteAddr({receiverAddressId:this.id},(data)=>{
							uni.navigateBack();
						})
					},
					cb_cancel:()=>{
						
					}
				})				
			},
			choooseDefault(){
				this.isDefault = !this.isDefault
			},
			save(){
				if(this.isDefault==true){
					this.isDefault = 1
				}else{
					this.isDefault = 0
				}
				let data={"receiverProvince":this.receiverProvince,"receiverCity":this.receiverCity,"receiverDistrict":this.receiverDistrict,"receiverName":this.name,"receiverPhone":this.tel,"receiverAddress":this.detailed,"setDefaultAddress":this.isDefault}				
				if(this.editType==1){
					data.receiverAddressId=this.id
				}
				if(!data.receiverName){
					this.$api.msg('请输入收件人姓名');
					return ;
				}
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(data.receiverPhone))){
					this.$api.msg('请填写正确手机号码');
					return ; 
				}
				if(!this.receiverProvince){
					this.$api.msg('请选择收件地址');
					return ;
				}
				if(!data.receiverAddress){
					this.$api.msg('请输入收件人详细地址');
					return ;
				}
				uni.showLoading({
					title:'正在提交'
				})
				
				addressModel.add(data,this.editType,(data)=>{
					uni.hideLoading();
					uni.navigateBack();
				})
				setTimeout(()=>{
					uni.setStorage({
						key:'saveAddress',
						data:data,
						success() {
							uni.hideLoading();
							//uni.navigateBack();
						}
					})
				},300)
				
				
			}
		},
		onBackPress() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel();
				return true;
			}
		},
		onUnload() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		}
	};
</script>
<style lang="scss">
page{
	background-color: #f2f2f2;
}
.item{
	display: flex;
	align-items: center;
	justify-content: space-between;
	height:84rpx;
	background-color: #fff;
	padding:0 20rpx;
	border-bottom: 1rpx solid #f2f2f2;
	&:first-child{
		margin-top: 20rpx;
	}
	image{
		width:10rpx;
		height:20rpx;
	}
}
textarea{
	height:168rpx;
	width:750rpx;
	background-color: #fff;
	padding:30rpx 20rpx;
}
.settingDefault{
	height:84rpx;
	margin-top: 20rpx;
	background-color: #fff;
	align-items: center;
	display: flex;
	justify-content: space-between;
	padding:0 20rpx;
	image{
		width:28rpx;
		height:28rpx;
	}
}

.delete{
	height:84rpx;
	margin-top: 20rpx;
	background-color: #fff;
	align-items: center;
	display: flex;
	padding:0 20rpx;
	color:#ff6600;
}
</style>
