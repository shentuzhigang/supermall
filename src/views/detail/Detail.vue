<template>
  <div id="detail">
    <DetailNavBar class="detail-nav"></DetailNavBar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imagesLoad"/>
      <detail-param-info :param-info="paramsInfo"/>
      {{iid}}详情
    </scroll>
  </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamInfo from "./childComps/DetailParamInfo";
    import Scroll from "../../components/common/scroll/Scroll";

    import {getDetail, Goods, Shop, GoodsParam} from 'network/detail'
    export default {
        name: "Detail",
        data(){
            return {
                iid:null,
                topImages:[],
                goods:{},
                shop:{},
                detailInfo:{},
                paramsInfo:{}
            }
        },
        components:{
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            Scroll
        },
        created(){
            this.iid = this.$route.params.iid
            getDetail(this.iid).then(res=>{
                //console.log(res);
                const data = res.result
                //1、轮播图
                this.topImages = data.itemInfo.topImages
                //2、商品信息
                this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
                //3、商店
                this.shop = new Shop(data.shopInfo)
                //4、详情
                this.detailInfo = data.detailInfo

                //5、参数
                this.paramsInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
            })

        },
        methods:{
            imagesLoad(){
              this.$refs.scroll.refresh()
            }
        }

    }
</script>

<style scoped>

  #detail{

    position: relative;
    z-index: 99;
    background-color: #ffffff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 99;
    top: 0;
    background-color: #ffffff;
  }
  .content{
    height: calc(100% - 44px);
  }
</style>
