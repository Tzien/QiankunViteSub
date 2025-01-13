<template>
  <div class="SubAppVue">
    <el-menu
      style="width: 300px; height: calc(100vh - 60px)"
      :default-active="activeIndex"
      class="el-menu-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
      <el-menu-item index="/">子应用Home</el-menu-item>
      <el-menu-item index="/about">子应用About</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const activeIndex = ref('/')
const handleSelect = (key, keyPath) => {
  router.push({ path: key })
}
</script>
<style>
body {
  margin: 0px;
}
.SubAppVue{
  display: flex;
}
</style>
