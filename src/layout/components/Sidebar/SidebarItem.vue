<template>
  <!-- fragment作为根结点但是不渲染,插件 -->
  <fragment v-if="!menuInfo.hidden">
    <template v-if="hasOneShowingChild(menuInfo.children, menuInfo) && (!onlyOneChild.children || onlyOneChild.noShowingChildren)">
      <template v-if="onlyOneChild.meta">
        <!--  v-bind="$props" v-on="$listeners"（必需，否则样式，事件丢失） -->
        <a-menu-item v-bind="$props" v-on="$listeners" :key="111">
          <a-icon :type="onlyOneChild.meta.icon" />
          <span>{{ onlyOneChild.meta.title }}</span>
        </a-menu-item>
      </template>
    </template>
    <!--  v-bind="$props" v-on="$listeners"（必需，否则样式,事件丢失） -->
    <a-sub-menu v-else v-bind="$props" v-on="$listeners">
      <span slot="title">
        <a-icon :type="menuInfo.meta.icon" /><span>{{ menuInfo.meta.title }}</span>
      </span>
      <sidebar-item v-for="child in menuInfo.children" :key="resolvePath(basePath,child.path)" :menu-info="child" :base-path="resolvePath(basePath,child.path)"></sidebar-item>
    </a-sub-menu>
  </fragment>
</template>

<script>
import { Menu } from 'ant-design-vue'
export default {
  name: 'SidebarItem',
  isSubMenu: true, // 必须
  props: {
    // ...Menu.Item.props,
    ...Menu.SubMenu.props,
    menuInfo: {
      type: Object,
      default: () => ({})
    },
    basePath: {
      type: String
    }
  },
  data () {
    this.onlyOneChild = null
    return {}
  },
  mounted () {
  },
  methods: {
    hasOneShowingChild (children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    },
    resolveSubPath (subPath) {
      return subPath.indexOf('/') > -1 ? subPath : ('/' + subPath)
    },
    resolvePath (basePath, path) {
      return basePath + '/' + path
    }
  }
}
</script>
