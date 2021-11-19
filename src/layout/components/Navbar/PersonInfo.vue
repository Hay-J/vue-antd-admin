<template>
  <div id="person-info">
    <a-tooltip style="margin-right: 1.5rem" placement="bottom">
      <template slot="title">
        <span>{{isFullScreen?'退出全屏':'全屏'}}</span>
      </template>
      <span @click="handleFullScreen()">
        <svg-icon style="font-size:1.2rem" icon-class="fullScreen"></svg-icon>
      </span>
    </a-tooltip>
    <!-- 下拉菜单 -->
    <a-dropdown class="dropdown-menu">
      <a class="ant-dropdown-link" style="color: rgba(10, 10, 10, 0.616)" @click="e => e.preventDefault()">
        {{$store.getters.name}}<a-icon style="margin-left:0.2rem" type="down" />
      </a>
      <a-menu slot="overlay" @click="onClick">
        <a-menu-item key="1">
          1st menu item
        </a-menu-item>
        <a-menu-item key="2">
          2nd menu item
        </a-menu-item>
        <a-menu-item key="3">
          退出
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <!-- 头像 -->
    <a-avatar :size="48" :src="$store.getters.avatar" />
  </div>
</template>

<script>

export default {
  data () {
    // 这里存放数据
    return {
      isFullScreen: false,
      userInfo: {
      }
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  methods: {
    onClick ({ key }) {
      // console.log(typeof key)
      if (key === '3') {
        this.$store.dispatch('user/logout').then(() => {
          this.$router.replace('/login')
        })
      }
    },
    // 全屏事件
    handleFullScreen () {
      this.isFullScreen = !this.isFullScreen
      const element = document.documentElement
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    }
  }
// beforeCreate() {}, //生命周期 - 创建之前
// beforeMount() {}, //生命周期 - 挂载之前
// beforeUpdate() {}, //生命周期 - 更新之前
// updated() {}, //生命周期 - 更新之后
// beforeDestroy() {}, //生命周期 - 销毁之前
// destroyed() {}, //生命周期 - 销毁完成
// activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="scss" scoped>
#person-info{
  display: flex;
  align-items: center;
  .dropdown-menu{
    margin-right: 0.8rem;
    .ant-dropdown-link{
      color: rgba(10, 10, 10, 0.616);
    }
  }
}

</style>
