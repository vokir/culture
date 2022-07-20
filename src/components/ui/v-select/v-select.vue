<template>
  <multiselect v-bind="selectOptions" :options="options"/>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  name: "v-select",
  props: {
    selectOptions: {
      type: Object,
      required: false,
      default: () => ({
        label: 'name',
        placeholder: 'select'
      })
    },
    options: {
      type: Object,
      required: true,
    }

  },
  components: {
    Multiselect
  },
}
</script>

<style lang="scss" src="./style.scss" scoped/>
<style src="vue-multiselect/dist/dist/vue-multiselect.css"/>
