<template>
  <component :is="layout" />
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router/dist/vue-router";
import LayoutDefault from "./layout/layout-default/layout-default.vue";

export default {
  name: 'App',
  components: { LayoutDefault },
  setup() {
    const router = useRoute()
    const layout = computed(()=>{
      return router.meta.layout ?? 'layout-default'
    })
    return {
      layout,
    }
  }
}
</script>

<style lang="scss" src="./assets/style/index.scss"/>
