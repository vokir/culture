<template>
  <div :class="['badge', 'badge--' + variant  ]" @mouseenter="showTooltip" @mouseleave="hideTooltip">
    {{ text }}
  </div>
  <teleport to="body" v-if="tooltip">
    <div v-if="hovering" :class="['tooltip', {'tooltip--active': hovering}]" ref="tooltipRef" :style="{...mouseCoords}">
      {{ tooltipText }}
    </div>
  </teleport>
</template>

<script>
import { ref } from "vue";
import debounce from "../../../hooks/useDebounce";
import { useEventListener } from "../../../hooks/useEventListeners";

export default {
  name: "v-badge",
  props: {
    text: {
      type: String,
      required: true
    },
    tooltip: {
      type: Boolean,
      default: false
    },
    tooltipText: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      required: false,
      default: 'blue',
      validator(value) {
        return ['blue', 'purple', 'orange', 'teal', 'lightblue'].includes(value)
      }
    }
  },
  setup() {
    const tooltipRef = ref(null)
    const mouseCoords = ref({
      top: '0px',
      left: '0px'
    })
    const hovering = ref(false)

    const showTooltip = () => {
      hovering.value = true
    }
    const hideTooltip = () => {
      hovering.value = false
    }

    const getMouseCoords = (event) => {
      if (!hovering.value) return
      mouseCoords.value.top = event.clientY + 10 + 'px'
      mouseCoords.value.left = event.clientX + 10 + 'px'
    }


    useEventListener(window, 'mousemove', debounce((e) => getMouseCoords(e), 0))


    return {
      tooltipRef,
      hovering,
      hideTooltip,
      showTooltip,
      mouseCoords,
    }
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>
