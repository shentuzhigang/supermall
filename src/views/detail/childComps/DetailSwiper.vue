<template>
  <swiper class="detail-swiper" v-if="topImages.length">
    <swiper-item v-for="item in topImages">
        <img :src="item" alt="" >
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper";

    export default {
        name: "DetailSwiper",
        components:{
            Swiper,
            SwiperItem
        },
        props:{
            topImages:Array,
            default(){
                return []
            }
        }
    }
</script>

<style scoped>
  .detail-swiper{
    height: 300px;
    overflow: hidden;
  }
</style>
