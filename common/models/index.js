import { HTTP } from '../http.js'


class IndexModel extends HTTP{


  getLatest(page,sCallback){
	    let result = {
			// distance:"distance",
			// order:"priceAsc",
			// latitude:114.258055,
			// longitude:22.727992,
			pageSize:10,
			userType:1,
			goodsFirsttype:8, //3
			// goodsSecondtype:"f2b3120e18eb44a99b55bba3814bad44",
			pageNo:page
		};
	                  
    this.request({
	  method:"POST",	
      url:'/app/goodss/getIndexList',
	  data:result,
      success:(data)=>{
          // // 如果不用箭头函数，this将指代不正确
          sCallback(data)
        }
    })
  }
  getSwiper(success){
	  
  	  let params = {
  		method:"POST",
  		url:"/app/banner/getList?position=index", 
  		success:success
  	  }
    this.request(params)
  }

  getIcons(data,success){ 
	  let params = {
		method:"POST",
		url:"/app/firsttypeinfo/getList", 
		// data:{
		// 	token:'348UJGW',
		// 	pageNo:1,
		// 	pageSize:10
		// },
		data:data,
		success:success
	  }
    this.request(params)
  }
  getOther(data,success){
	  let params={
		  method:"POST",
		  url:"/app/otheradvert/getList?showPage=1&showPosition=1",
		  data:data,
		  success:success
	  }
	  this.request(params)
  }
	
	getIndexData(data,success){
		let params = {
			method:"POST",
			url:"/app/goodss/getIndexList",
			data:data,
			success:success
		}
		this.request(params)
	}


}

export {IndexModel}