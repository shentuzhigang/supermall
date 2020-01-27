<template>
  <div id="app" class="wrapper">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <router-view/>

    <MainTabBar/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import MainTabBar from "./components/content/mainTabbar/MainTabBar";
export default {
  name: 'app',
  components: {
    HelloWorld,
    MainTabBar
  }
}
</script>

<style>
  @import "assets/css/base.css";

</style>
