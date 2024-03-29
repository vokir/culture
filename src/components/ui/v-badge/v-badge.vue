<template>
  <div
    :class="['badge', 'badge--' + variant, { 'badge--big': big }]"
    v-bind="$attrs"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
  >
    {{ text }}
  </div>

  <teleport v-if="tooltip" to="body">
    <div
      v-if="hovering"
      ref="tooltipRef"
      :class="['tooltip', { 'tooltip--active': hovering }]"
      :style="{ ...mouseCoords }"
    >
      {{ tooltipText }}
    </div>
  </teleport>
</template>

<script>
import { ref } from 'vue';
import debounce from '../../../hooks/useDebounce';
import { useEventListener } from '../../../hooks/useEventListeners';

export default {
  name: 'VBadge',
  inheritAttrs: false,
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
    big: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      required: false,
      default: 'blue',
      validator(value) {
        return [
          'blue',
          'purple',
          'orange',
          'teal',
          'lightblue',
          'gray',
          'danger',
          'warning',
          'gray-dark'
        ].includes(value);
      }
    }
  },
  setup() {
    const tooltipRef = ref(null);
    const mouseCoords = ref({
      top: '0px',
      left: '0px'
    });
    const hovering = ref(false);

    const showTooltip = () => {
      hovering.value = true;
    };
    const hideTooltip = () => {
      hovering.value = false;
    };

    const getMouseCoords = (event) => {
      if (!hovering.value) return;
      mouseCoords.value.top = event.clientY + 10 + window.pageYOffset + 'px';
      mouseCoords.value.left = event.clientX + 10 + 'px';
    };

    useEventListener(
      window,
      'mousemove',
      debounce((e) => getMouseCoords(e), 0)
    );

    return {
      tooltipRef,
      hovering,
      hideTooltip,
      showTooltip,
      mouseCoords
    };
  }
};
</script>

<style lang="scss" src="./style.scss" scoped />
