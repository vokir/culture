<template>
  <div :class="['badge', 'badge--' + variant  ]" @mouseenter="showTooltip" @mouseleave="hideTooltip">
    {{ text }}
  </div>
  <teleport to="body">
    <div v-if="hovering" :class="['tooltip', {'tooltip--active': hovering}]" ref="tooltip" :style="{...mouseCoords}">
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
      default: 'Text'
    },
    variant: {
      type: String,
      required: false,
      default: 'blue',
      validator(value) {
        return ['blue', 'purple', 'orange', 'teal'].includes(value)
      }
    }
  },
  setup() {
    const tooltip = ref(null)
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
      tooltip,
      hovering,
      hideTooltip,
      showTooltip,
      mouseCoords,
    }
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>
