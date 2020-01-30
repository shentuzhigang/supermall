<template>
  <div class="cart">
    <nav-bar class="cart-nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list class="content" :cartList="$store.state.cartList"/>
    <bottom-bar></bottom-bar>
    <h2>购物车</h2>
  </div>

</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import BottomBar from "./childComps/BottomBar";

  import {mapGetters} from "vuex";
  export default {
    name: "Cart",
    components:{
        NavBar,
        CartList,
        BottomBar
    },
    data(){
        return {
          num:0
        }
    },
    computed:{

      ...mapGetters([
          'cartLength'
      ])
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .cart-nav-bar{
    background-color: var(--color-tint);
    color: white;
  }
  .content{
    height: calc(100% - 44px);
  }
</style>
