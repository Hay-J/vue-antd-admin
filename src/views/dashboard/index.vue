<template>
  <div class="dashboard">
    <section class="goCard">
      <a-card style="min-width:100%" title="快捷方式">
        <a-card-grid v-for="short in shortcut" :key="short.path" style="width:20%;display:flex;justify-content:center;align-items:center;text-align:center">
          <svg-icon style="font-size:48px;margin-right:5px" :icon-class="short.icon" />{{short.name}}
        </a-card-grid>
      </a-card>
    </section>
    <div>{{timeState}}</div>

  </div>
</template>

<script>
import { getTimeState } from '@/utils/time.js'

export default {
  name: 'Dashboard',
  created () {
    this.$store.dispatch('user/getShortcut').then(() => {})
  },
  computed: {
    shortcut () {
      return this.$store.getters.shortcut
    },
    timeState () {
      return getTimeState()
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  .goCard{
    display: flex;
    justify-content: space-between;
  }
}
</style>
