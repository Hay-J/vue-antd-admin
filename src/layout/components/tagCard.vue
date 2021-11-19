<template>
  <a-tabs
    class="tab-container"
    v-model="activeKey"
    :tabBarGutter="5"
    type="editable-card"
    hideAdd
    @edit="onEdit"
    @tabClick="onClick"
  >
    <a-tab-pane
      v-for="pane in panes"
      :key="pane.path"
      :tab="pane.name"
      :closable="pane.closable"
    >
    </a-tab-pane>
  </a-tabs>
</template>
<script>
export default {
  name: 'TagCard',
  data () {
    return {
      activeKey: '/dashboard',
      panes: [], // {name:'标签名',path:'全路径'}
      newTabIndex: 0
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.savePane(route)// 保存pane,参数是当前路由
        this.activeKey = route.fullPath
      },
      immediate: true
    }
  },
  created () {
    if (this.$route.fullPath !== '/dashboard') {
      this.panes.unshift({ name: '仪表盘', path: '/dashboard', closable: false })
    }
  },
  methods: {
    savePane (route) {
      // 找下标，没有返回-1
      const result = this.panes.findIndex(pane => pane.path === route.fullPath)
      if (result === -1) {
        if (route.meta.affix) {
          this.panes.push({ name: route.meta.title, path: route.fullPath, closable: false })
        } else {
          this.panes.push({ name: route.meta.title, path: route.fullPath })
        }
      }
    },
    // 点击tag回调
    onClick (key) {
      if (this.$route.fullPath !== key) {
        this.$router.push({ path: key })
      }
    },
    // 删除tag回调
    onEdit (targetKey) {
      const result = this.panes.findIndex(pane => pane.path === targetKey)
      this.panes.splice(result, 1)
      if (targetKey === this.$route.fullPath) {
        this.$router.push({ path: this.panes[result - 1].path })
      }
    },
    add () {
      const panes = this.panes
      const activeKey = `newTab${this.newTabIndex++}`
      panes.push({
        title: 'New Tab',
        content: 'Content of new Tab',
        key: activeKey
      })
      this.panes = panes
      this.activeKey = activeKey
    },
    remove (targetKey) {
      let activeKey = this.activeKey
      let lastIndex
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1
        }
      })
      const panes = this.panes.filter((pane) => pane.key !== targetKey)
      if (panes.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
          activeKey = panes[lastIndex].key
        } else {
          activeKey = panes[0].key
        }
      }
      this.panes = panes
      this.activeKey = activeKey
    }
  }
}
</script>

<style lang="scss">
// 带important都是修改默认样式
.tab-container {
  .ant-tabs-bar {
    margin: 2px 1rem !important;
    border-bottom: none;
  }
  .ant-tabs-nav {
    .ant-tabs-tab {
      border-radius: 4px !important;
      background: #fff !important;
      border: 2px solid #e8e8e8 !important;
    }
    .ant-tabs-tab-active {
      color: rgba(255, 255, 255, 1) !important;
      background: #1890ff !important;
      // border-bottom: 3px solid #50fffeff !important;
    }
  }
}
</style>
