<template>
  <label :for="uid" class="checkbox" @click.stop>
    <input
        :id="uid"
        v-model="localValue"
        :value="value"
        class="checkbox__input"
        type="checkbox"
        v-bind="$attrs"
    >
    <span class="checkbox__check">
      <v-icon height="16" name="check" width="16"/>
    </span>
  </label>
</template>

<script>
import {computed, getCurrentInstance} from "vue";
import {useVModel} from "@vueuse/core";
import VIcon from "@/components/ui/v-icon/v-icon.vue";

export default {
  name: "v-checkbox",
  components: {VIcon},
  inheritAttrs: false,
  props: {
    value: {default: ''},
    modelValue: {
      type: [Array, Boolean],
      default: false
    },
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const localValue = useVModel(props, 'modelValue', emit)
    const uid = computed(() => {
      let instance = getCurrentInstance()
      return instance.uid
    })
    return {
      uid,
      localValue
    }
  }
}
</script>

<style lang="scss" scoped src="./style.scss"/>
