<template>
  <a-layout id="layout-container">
    <a-layout-sider v-model="isCollapsed" :trigger="null" collapsible>
      <div class="logo">logo</div>
      <!-- 侧边栏菜单 -->
      <sidebar-menu></sidebar-menu>
    </a-layout-sider>

    <a-layout>
      <!-- 头部功能栏 -->
      <a-layout-header class="header-container">
        <!-- 折叠按钮 -->
        <a-icon
          class="trigger"
          :type="isCollapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (isCollapsed = !isCollapsed)"
        />
        <!-- 面包屑导航 -->
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
      </a-layout-header>
      <!-- 内容主体 -->
      <a-layout-content :style="{ margin: '0 16px' }">
        <a-tabs hide-add type="editable-card">
          <a-tab-pane>
            <!-- <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title" :closable="pane.closable"> -->
            <div
              :style="{
                padding: '24px',
                background: '#fff',
                minHeight: '360px',
              }"
            >
              content
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-layout-content>
      <!-- 页脚 -->
      <a-layout-footer style="textalign: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import SidebarMenu from './components/SidebarMenu'
export default {
  data () {
    return {
      isCollapsed: false
    }
  },
  components: {
    SidebarMenu
  },
  methods: {
    onCollapse (collapsed, type) {
      console.log(collapsed, type)
    },
    onBreakpoint (broken) {
      console.log(broken)
    }
  }
}
</script>

<style lang="scss" scoped>
$bgColor: rgba(255, 255, 255, 0.2);
#layout-container {
  height: 100vh;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }
  .logo {
    height: 32px;
    background: $bgColor;
    margin: 16px;
  }
  .header-container {
    background: #fff;
    padding: 0;
    display: flex;
    align-items: center;
  }
}
</style>
