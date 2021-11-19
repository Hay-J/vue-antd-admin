<template>
  <div id="navbar-container">
    <div class="hamburger-container">
      <!--  折叠按钮  -->
      <a-button type="primary" @click="toggleSideBar">
        <a-icon :type="isCollapsed ? 'menu-unfold' : 'menu-fold'" />
      </a-button>
      <!-- 面包屑导航 -->
      <a-breadcrumb separator="/" style="margin-left: 1rem;font-size:1rem">
        <a-breadcrumb-item v-for="(breadcrumb, index) in breadcrumbList" :key="index">{{breadcrumb}}</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <person-info class="avatar-contanier"/>
  </div>
</template>

<script>
import PersonInfo from './PersonInfo.vue'
export default {
  name: 'Navbar',
  components: {
    PersonInfo
  },
  data () {
    return {
      msg: 'hello',
      isCollapsed: false,
      breadcrumbList: null
    }
  },
  computed: {

  },
  watch: {
    $route: {
      handler: function () {
        this.breadcrumbList = this.getBreadcrumbListByRoute()
      },
      immediate: true
    }
  },
  methods: {
    // 收起侧边栏事件
    toggleSideBar () {
      this.isCollapsed = !this.isCollapsed
      this.$store.dispatch('app/toggleSideBar')
    },
    getBreadcrumbListByRoute () {
      const matchedArr = this.$route.matched
      const BreadcrumbList = []
      matchedArr.forEach((item) => {
        if (item.meta.title) {
          BreadcrumbList.push(item.meta.title)
        }
      })
      return BreadcrumbList
    }
  }
}
</script>

<style lang="scss" scoped>
#navbar-container{
  display: flex;
  justify-content: space-between;
  align-items: center;
  .hamburger-container{
    display: flex;
    margin-left: 1rem;
    align-items: center;
  }
  .avatar-contanier{
    margin-right: 3rem;
  }
}
.tag-container{
  margin-top: 0.5rem;
}
</style>
