import Vue from 'vue'
import App from './App'
import store from './store'
import TIM from 'tim-wx-sdk'
import COS from 'cos-wx-sdk-v5'
import TYPES from '@/common/types.js'
Vue.config.productionTip = false

App.mpType = 'app'

let options = {
	SDKAppID:1400292904
}

const tim = TIM.create(options)
tim.setLogLevel(0)
tim.registerPlugin({'cos-wx-sdk': COS})



const msg = (title, duration=1500, mask=false, icon='none')=>{ 
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

 const tip = (params) => {
    console.log(params)
    var that = this;
    var title = params.hasOwnProperty('title') ? params['title'] : '提示';
    var content = params.hasOwnProperty('content') ? params['content'] : '';
    wx.showModal({
      title: title,
      content: content,
	  confirmColor:"#FF6600",
	 // showCancel: false,  去掉取消
      success: function(res) {
        if (res.confirm) { //点击确定
          if (params.hasOwnProperty('cb_confirm') && typeof(params.cb_confirm) == "function") {
            params.cb_confirm();
          }
        } else { //点击否
          if (params.hasOwnProperty('cb_cancel') && typeof(params.cb_cancel) == "function") {
            params.cb_cancel();
          }
        }
      }
    })
  }


let $bus = new Vue()
wx.$app = tim
Vue.prototype.tim = tim
Vue.prototype.TIM = TIM
Vue.prototype.$type = TYPES
Vue.prototype.$bus = $bus

tim.on(TIM.EVENT.SDK_READY, onReadyStateUpdate, this)
tim.on(TIM.EVENT.SDK_NOT_READY, onReadyStateUpdate, this)


// tim.on(TIM.EVENT.KICKED_OUT, event => {
//   store.commit('resetGroup')
//   store.commit('resetUser')
//   store.commit('resetCurrentConversation')
//   store.commit('resetAllConversation')
//   uni.showToast({
//     title: '你已被踢下线',
//     icon: 'none',
//     duration: 1500
//   })
//   setTimeout(() => {
//     uni.reLaunch({
//       url: '/pages/msg/msg'
//     })
//   }, 1500)
// })


// 出错统一处理
tim.on(TIM.EVENT.ERROR, event => {
  // 网络错误不弹toast && sdk未初始化完全报错
  if (event.data.code !== 2800 && event.data.code !== 2999) {
    store.commit('showToast', {
      title: event.data.message,
      duration: 2000
    })
  }
})


tim.on(TIM.EVENT.MESSAGE_RECEIVED, event => {
  store.dispatch('onMessageEvent', event)
})
tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, event => {
  store.commit('updateAllConversation', event.data)
})
tim.on(TIM.EVENT.GROUP_LIST_UPDATED, event => {
  store.commit('updateGroupList', event.data)
})
tim.on(TIM.EVENT.BLACKLIST_UPDATED, event => {
  store.commit('updateBlacklist', event.data)
})
tim.on(TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED, event => {
  console.log('system message', event)
})


Vue.prototype.$api = {msg,tip};
Vue.prototype.$store = store;




function onReadyStateUpdate ({ name }) {
  const isSDKReady = (name === TIM.EVENT.SDK_READY)
  if (isSDKReady) {
    uni.hideLoading()
    // uni.switchTab({
    //   url: '/pages/msg/msg'
    // })
  }
  store.commit('setSdkReady', isSDKReady)
}

const app = new Vue({
    ...App
})
app.$mount()
