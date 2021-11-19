<template>
  <a-layout-sider v-model="isCollapsed" :trigger="null" collapsible>
    <!-- logo -->
    <div class="logo" @click="onLogoClick" :style="isCollapsed ? 'justify-content: center;' : ''">
      <img
        style="width: 42px; height: 42px"
        src="../../../assets/logo.png"
        alt=""
      />
      <span v-show="!isCollapsed" style="font-size: 22px; color: whitesmoke"
        >Admin</span
      >
    </div>
    <a-menu
      mode="inline"
      theme="dark"
      :selected-keys="[selectedKeys]"
      :openKeys="openKeys"
      @openChange="onOpenChange"
      @click="handleMenuClick"
    >
      <sidebar-item
        v-for="route in routes"
        :key="resolvePath(route)"
        :menu-info="route"
        :base-path="route.path"
      />
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem.vue'
export default {
  name: 'Sidebar',
  components: {
    // SubMenu,
    SidebarItem
  },
  data () {
    this.onlyOneChild = null
    return {
      selectedKeys: '',
      openKeys: [],
      openKeysCopy: null,
      clickNum: 0
    }
  },
  computed: {
    ...mapGetters(['sidebar']),
    // 所有路由列表
    routes () {
      return this.$router.options.routes
    },
    // 侧边栏折叠与否
    isCollapsed () {
      return !this.sidebar.opened
    }
  },
  created () {
    this.selectedKeys = this.$route.path
  },
  mounted () {},
  watch: {
    $route: {
      handler: function (route) {
        this.selectedKeys = this.$route.path
        if (!this.isCollapsed) {
          this.openKeys = this.getOpenKeysByRoute()
        }
      },
      immediate: true
    },
    isCollapsed: {
      handler: function (flag) {
        // flag为true折叠，拷贝openKeys,并设置openKeys为空数组,
        if (flag) {
          this.openKeys = []
        } else {
          this.openKeys = this.getOpenKeysByRoute()
        }
      }
    }
  },
  methods: {
    handleMenuClick ({ key, keyPath }) {
      // console.log(key, keyPath)
      // 获取到当前的key,并且跳转
      this.$router.push({
        path: key
      })
      keyPath = keyPath.slice(1)
      this.openKeys = keyPath
      this.selectedKeys = key
    },
    // 展开子菜单回调
    onOpenChange (openKeys) {
      this.openKeys = openKeys
    },
    onLogoClick () {
      this.clickNum++
      if (this.clickNum >= 3) {
        this.$message.info('别点啦，我没有功能！')
      }
    },
    /**
     * 返回值为通过当前路由匹配的openKeys
     */
    getOpenKeysByRoute () {
      const matchedArr = this.$route.matched
      const openKeys = []
      for (let i = 0, len = matchedArr.length; i < len - 1; i++) {
        // 取openKeys
        if (matchedArr[i].meta.title) {
          openKeys.push(matchedArr[i].path)
        }
      }
      return openKeys
    },
    /**
     * 判断...
     * 返回布尔值
     */
    isOnlyOneChild (children = [], parent) {
      // 过滤出显示的孩子路由
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })
      // 有一个可显示的孩子, 并且孩子没有孩子, 此时路由拼接
      if (showingChildren.length === 1 && !showingChildren[0].children) {
        return true
      } else {
        // 否则路由不拼接
        return false
      }
    },

    resolvePath (route) {
      if (this.isOnlyOneChild(route.children, route)) {
        return route.path === '/'
          ? route.path + this.onlyOneChild.path
          : route.path + '/' + this.onlyOneChild.path
      } else {
        return route.path
      }
    }
  }
}
</script>

<style scoped>
.logo {
  height: 2rem;
  /* background: rgba(255, 255, 255, 0.2); */
  margin: 1rem;
  position: relative;
  display: flex;
  /* justify-content: center; */
  align-items: center;
}
</style>
