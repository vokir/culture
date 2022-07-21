<template>
  <div class="">select</div>
</template>

<script>

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
}
</script>

<style lang="scss" src="./style.scss" scoped/>
