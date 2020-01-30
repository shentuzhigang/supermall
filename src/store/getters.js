export default {
  cartLength(state) {
    return state.cartList.length;
  },
  cartList(state){
    return state.cartList;
  },
  cartCount(state){
    return state.cartList.filter(item => {
      return item.checked
    }).reduce((preValue, item) => {
      return preValue + 1
    }, 0)
  }
}
