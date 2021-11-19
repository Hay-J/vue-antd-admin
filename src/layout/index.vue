<template>
  <a-layout id="layout-container">
    <!-- 侧边栏 -->
    <sidebar class="sidebar-container"></sidebar>

    <a-layout class="layout-right">
      <!-- 头部 -->
      <a-layout-header class="layout-header">
        <navbar class="navbar-container"></navbar>
        <tag-card class="tag-card"></tag-card>
      </a-layout-header>
      <a-layout class="layout-main">
        <div class="layout-content">
          <!-- <transition mode="out-in" enter-active-class="animate__animated animate_lightSpeedInLeft" leave-active-class="animate__animated animate__lightSpeedOutRight"> -->
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
          <!-- </transition> -->
        </div>
        <a-layout-footer style="textAlign: center">
          H-Admin ©2021 Created by @Hay-J
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import TagCard from './components/tagCard'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    Navbar,
    TagCard
  },
  created () {
    this.$notification.open({
      message: '干劲满满',
      description:
        '今天也是充满希望的一天！！！',
      icon: <a-icon type="smile" style="color: #ffc53d" />
    })
  }
}
</script>

<style lang="scss" scoped>
#layout-container {
  height: 100vh;
  .sidebar-container{
    overflow: auto;
  }
  .layout-right {
    background-color: #f4f4f4;
    .layout-header {
      padding: 0;
      height: 108px; //修改a-layout-header默认样式
      background: #ececec; //修改a-layout-header默认样式
      .navbar-container {
        background-color: #fff;
      }
      .tag-card {
        margin-top: 1px;
        background-color: #fff;
      }
    }
    .layout-main{
      // min-height: calc(100% - 108px);
      overflow: auto;
      .layout-content {
        margin: 1.5rem 1rem 1rem;
        box-shadow: 0px 0px 16px 0px rgba(200, 200, 200, 0.5);
      }
    }
  }
}
</style>
