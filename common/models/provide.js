import { HTTP } from '../http.js'

class ProvideModel extends HTTP{
	getSecondType(data,success){
		let params = {
			method:"POST",
			url:"/app/secondtypeinfo/getListByNeedFirst",
			data:data,
			success:success
		}
		this.request(params)
	}
	
	getSwiperImage(data,success){
	    let params = {
			method:"POST",
			url:"/app/banner/getList",
			data:data,
			success:success
		}
		this.request(params)
	}
	
	getItemList(data,success){
		let params = {
			method:'POST',
			url:'/app/goodss/getIndexList',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	getItemDetail(data,success){
		let params = {
			method:'POST',
			url:'/app/goodss/findOne',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	addCart(data,success){
		let params = {
			method:'POST',
			url:'/app/shCarts/addGoodsToCartList',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//单个商品结算
	addOneTotal(data,success){
		let params = {
			method:'POST',
			url:'/app/shCarts/oneTotal',
			data:data,
			success:success
		}
		this.request(params)
	}
	
	//添加访问记录
	addVisitRecord(data,success){
		let params = {
			method:'POST',
			url:'/app/historyRecord/add',
			data:data,
			success:success
		}
		this.request(params)
	}
}

export {ProvideModel}