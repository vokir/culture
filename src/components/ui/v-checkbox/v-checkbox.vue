<template>
  <label :for="name" class="checkbox">
    <input class="checkbox__input" :id="name" type="checkbox" @change="updateValue">
    <span class="checkbox__check">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
        <path
            d="M6.66917 11.3333L12.5608 5.44083L11.3825 4.2625L6.66917 8.97667L4.31167 6.61917L3.13333 7.7975L6.66917 11.3333Z"
            fill="white"
        />
      </svg>
    </span>
  </label>
</template>

<script>
export default {
  name: "v-checkbox",
  emits: ['update:checked'],
  props: {
    name: {
      type: String,
      required: true
    },
  },
  setup(_, { emit }) {
    const updateValue = (event) => {
      emit('update:checked', event.target.checked)
    }
    return {
      updateValue,
    }
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>
