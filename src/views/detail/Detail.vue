<template>
  <div id="detail">
    <detail-nav-bar  class="detail-nav"
                     ref="navbar"
                     @titleClick="titleClick"/>
    <scroll class="content"
            :probe-type="3"
            ref="scroll" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imagesLoad="imagesLoad"/>
      <detail-param-info ref="params" :param-info="paramsInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <detail-recommend-info ref="recommends" :recommend-list="recommendInfo"/>
      {{iid}}详情
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addToCart="addCart"/>
  </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamInfo from "./childComps/DetailParamInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import DetailRecommendInfo from "./childComps/DetailRecommendInfo";
    import DetailBottomBar from "./childComps/DetailBottomBar";
    import BackTop from "components/content/backTop/BackTop";
    import Scroll from "components/common/scroll/Scroll";

    import { Goods, Shop, GoodsParam} from 'network/detail'
    import { getDetail,getRecommend} from "network/detail";
    export default {
        name: "Detail",
        data(){
            return {
                iid:null,
                topImages:[],
                goods:{},
                shop:{},
                detailInfo:{},
                paramsInfo:{},
                commentInfo:{},
                recommendInfo:[],
                themesTop:[],
                isShowBackTop: false,
                currentIndex:0
            }
        },
        components:{
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            DetailRecommendInfo,
            DetailBottomBar,
            BackTop,
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
                //6、评论
                if(data.rate.cRate !== 0){
                    this.commentInfo = data.rate.list[0]
                }



            })



            getRecommend().then(res=>{
                this.recommendInfo = res.data.list;
            })

            this.$nextTick(()=>{

            })

        },
        mounted(){

        },

        methods:{
            imagesLoad(){
              this.$refs.scroll.refresh()
                this.themesTop.push(0)
                this.themesTop.push(this.$refs.params.$el.offsetTop)
                this.themesTop.push(this.$refs.comment.$el.offsetTop)
                this.themesTop.push(this.$refs.recommends.$el.offsetTop)
                //console.log(this.themesTop)
            },
            titleClick(index){
                this.$refs.scroll.scrollTo(0,-this.themesTop[index],100)
            },
            backTopClick() {
                this.$refs.scroll.scrollTo(0, 0)
            },
            contentScroll(position){
                this.isShowBackTop = (-position.y) > 1000
              const Y = -position.y
                let length = this.themesTop.length
                for (let i = 0; i < length; i++) {
                    let iPos = this.themesTop[i];
                    /**
                     * 判断的方案:
                     *  方案一:
                     *    条件: (i < (length-1) && currentPos >= iPos && currentPos < this.themeTops[i+1]) || (i === (length-1) && currentPos >= iPos),
                     *    优点: 不需要引入其他的内容, 通过逻辑解决
                     *    缺点: 判断条件过长, 并且不容易理解
                     *  方案二:
                     *    条件: 给themeTops最后添加一个很大的值, 用于和最后一个主题的top进行比较.
                     *    优点: 简洁明了, 便于理解
                     *    缺点: 需要引入一个较大的int数字
                     * 疑惑: 在第一个判断中, 为什么不能直接判断(currentPos >= iPos)即可?
                     * 解答: 比如在某一个currentPos大于第0个时, 就会break, 不会判断后面的i了.
                     */
                      if (i+1 ===length || (Y >= iPos && Y < this.themesTop[i+1])) {
                          if (this.currentIndex !== i) {
                              this.currentIndex = i;
                              this.$refs.navbar.currentIndex=i;
                          }
                          break;
                      }
                }
            },
            addCart(){
                const product = {}
                product.image = this.topImages[0]
                product.title = this.goods.title
                product.desc = this.goods.desc
                product.price = this.goods.realPrice
                product.id = this.iid

                this.$store.commit('addCart',product)
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
    height: calc(100% - 44px - 58px);
  }
</style>
