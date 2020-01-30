import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
import getters from "./getters";
const store = new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations:{
    addCart(state,info) {
      // 1.查看是否添加过
      const oldInfo = state.cartList.find(item => item.id === info.id)

      // 2.+1或者新添加
      if (oldInfo) {
        oldInfo.count += 1
      } else {
        info.count = 1
        info.checked = true
        state.cartList.push(info)
      }
    }
  },
  getters
})

export default store


